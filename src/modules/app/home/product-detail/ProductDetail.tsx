import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Tabs,
  TabsProps,
  Skeleton,
  Tag,
  message,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { IProduct } from '../../../../types/product.types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { cartService, productService } from '../../../../services';
import buildImageUrl from '../../../../utils/build-image-url';
import { getUserData, getCartData, setCartData } from '../../../../utils/localStorage';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [userData] = useState(getUserData());
  const [cartInfo] = useState(getCartData());


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const response = await productService.findOne(id);
          const productData = response.data.productDetail;
          setProduct(productData);
        }
      } catch (error) {
        message.error('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);



  const handleAddToCart = async () => {
    if(!userData) {
      message.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    if(!cartInfo?._id) {
      message.error("Không tìm thấy giỏ hàng của bạn. Vui lòng tải lại trang");
      console.error("Cart info not found:", cartInfo);
      return;
    }

    try {
      const rs = await cartService.addItemToCart(cartInfo._id, {
        productId: product!._id,
        quantity: 1
      });

      setCartData(rs.data)

      message.success('Đã thêm vào giỏ hàng');
    } catch (error) {
      console.error("Add to cart error:", error);
      message.error('Thêm vào giỏ hàng thất bại');
    }
  };



  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Mô Tả Chi Tiết',
      children: product?.description || 'Không có mô tả',
    }
  ];


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-8">Không tìm thấy sản phẩm</div>;
  }



    // Đã loại bỏ phần hiển thị sản phẩm liên quan

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Swiper
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="!h-[420px] rounded-lg shadow-lg"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.img
                  src={buildImageUrl(image)}
                  alt={product.name}
                  className="w-full h-full !object-contain"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            // onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            className="thumbnail-swiper !h-[60px]"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={buildImageUrl(image)}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full !h-16 !object-contain cursor-pointer rounded-lg border-2 border-transparent hover:border-blue-500"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-red-600">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.price)}
              </span>
            </div>


            <div className="flex gap-4 mt-6">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Thêm vào giỏ hàng
              </Button>

            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Danh mục:</h3>
            <div className="flex flex-wrap gap-2">
              {product.categories.map((category, index) => (
                <Tag className="px-3 py-1" color="geekblue" key={index}>
                  {category.name}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-[40px]"
      >
        <Tabs
          items={items}
          defaultActiveKey="1"
          animated
          tabBarStyle={{ fontSize: '16px' }}
        />
      </motion.div>

      {/* Đã loại bỏ phần hiển thị sản phẩm liên quan */}
    </motion.div>
  );
}
