import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spin, InputNumber, Divider, Empty, Tag } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { ICart } from '../../../types/cart.types';
import { cartService } from '../../../services';
import { useDispatch } from 'react-redux';
import { addCartInfo } from '../../../lib/reducer/cartSlice';
import buildImageUrl from '../../../utils/build-image-url';
import { useNavigate } from 'react-router-dom';
import { DEFINE_USER_ROUTERS } from '../../../constants/route-mapper';

const Cart = () => {
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const { data } = await cartService.find();
      setCart(data);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (!cart) return;
    
    setUpdating(true);
    try {
      const updatedItems = cart.items.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      
      const { data } = await cartService.update(cart._id, { 
        items: updatedItems.map(item => ({
          productId: item.productId._id,
          sku: item.sku,
          quantity: item.quantity
        }))
      });
      setCart(data);
      dispatch(addCartInfo(data));
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!cart) return;

    setUpdating(true);
    try {
      const filteredItems = cart.items.filter(item => item._id !== itemId);
      const { data } = await cartService.update(cart._id, { 
        items: filteredItems.map(item => ({
          productId: item.productId._id,
          sku: item.sku,
          quantity: item.quantity
        }))
      });
      setCart(data);
      dispatch(addCartInfo(cart))
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCartOutlined className="text-2xl text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Giỏ hàng của bạn</h2>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          {cart?.items.length || 0} sản phẩm
        </span>
      </div>

      <AnimatePresence>
        {cart?.items.length ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {cart.items.map((item) => {
                const variant = item.productId.variants.find(v => v.sku === item.sku);
                const price = variant?.price || 0;
                const originalPrice = variant?.originalPrice || 0;
                const hasDiscount = originalPrice > price;
                const totalDiscount = originalPrice - price;
                const discountPercentage = hasDiscount 
                  ? Math.round(((originalPrice - price) / originalPrice) * 100)
                  : 0;

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="group flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                      <img 
                        src={buildImageUrl(item.productId.images[0])} 
                        className="object-contain w-full h-full"
                        alt={item.productId.name}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">{item.productId.name}</h3>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <Tag color="blue">{variant?.color}</Tag>
                        <Tag>{variant?.storageCapacity}</Tag>
                      </div>
                      <p className="text-gray-500 text-sm mt-1 truncate">SKU: {item.sku}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <InputNumber
                        min={1}
                        max={10}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item._id, value!)}
                        className="w-20"
                        disabled={updating}
                      />

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          removeItem(item._id); 
                        }}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <DeleteOutlined className="text-lg" />
                      </motion.button>
                    </div>

                    <div className="w-32 text-right">
                      <div className="flex flex-col">
                        {hasDiscount && (
                          <>
                            <span className="text-gray-400 line-through text-sm">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(originalPrice * item.quantity)}
                            </span>
                            <Tag color="red" className="self-end mt-1">
                              -{discountPercentage}% ({new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(totalDiscount)})
                            </Tag>
                          </>
                        )}
                        <span className={`font-medium ${
                          hasDiscount ? 'text-green-600' : 'text-gray-800'
                        }`}>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="md:w-96 w-full h-fit bg-gray-50 p-6 rounded-xl shadow-inner sticky top-6"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Tổng kết đơn hàng</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sản phẩm</span>
                    <span className="text-gray-800">
                      {cart.items.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tổng giá gốc</span>
                    <span className="text-gray-400 line-through text-sm">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(
                        cart.items.reduce((acc, item) => {
                          const variant = item.productId.variants.find(v => v.sku === item.sku);
                          return acc + (variant?.originalPrice || variant?.price || 0) * item.quantity;
                        }, 0)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Giảm giá sản phẩm</span>
                    <span className="text-red-600 font-bold">
                      -{new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(
                        cart.items.reduce((acc, item) => {
                          const variant = item.productId.variants.find(v => v.sku === item.sku);
                          const originalPrice = variant?.originalPrice || variant?.price || 0;
                          return acc + (originalPrice - (variant?.price ?? 0)) * item.quantity;
                        }, 0)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="text-green-600 font-bold">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(
                        cart.items.reduce((acc, item) => {
                          const variant = item.productId.variants.find(v => v.sku === item.sku);
                          return acc + (variant?.price ?? 0) * item.quantity;
                        }, 0)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Phí ship
                      <span className="text-xs text-gray-400 ml-1">(Nội thành Hà Nội)</span>
                    </span>
                    <span className="text-gray-800">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(30000)}
                    </span>
                  </div>

                  <Divider className="my-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">Tổng thanh toán</span>
                    <span className="text-xl font-bold text-gray-800">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(
                        cart.items.reduce((acc, item) => {
                          const variant = item.productId.variants.find(v => v.sku === item.sku);
                          return acc + (variant?.price ?? 0) * item.quantity;
                        }, 0) + 30000
                      )}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      navigate(DEFINE_USER_ROUTERS.checkoutPage)
                    }}
                    className="w-full bg-black text-white py-4 rounded-lg font-medium shadow-lg mt-4"
                  >
                    Tiến hành thanh toán
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-gray-500">Giỏ hàng của bạn đang trống</span>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cart;