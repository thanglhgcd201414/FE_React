import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Tag, Divider, Steps, Checkbox, message } from 'antd';
import {
  CreditCardOutlined,
  TruckOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import buildImageUrl from '../../../../utils/build-image-url';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../../lib/store';
import { cartService, orderService, paymentService } from '../../../../services';
import { ICart } from '../../../../types/cart.types';
import { EPaymentMethod } from '../../../../constants/order-status';
import GeneralLoading from '../../../../components/base/GeneralLoading';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import { clearCart } from '../../../../lib/reducer/cartSlice';
import { formatCurrency } from '../../../../utils/format-money';

const { Step } = Steps;

const CheckoutPage = () => {
  const { userData } = useSelector((state: IRootState) => state.user);
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<EPaymentMethod>(
    EPaymentMethod.CAST,
  );
  const [orderId, setOrderId] = useState<string>('');
  const [isConfirmedTerm, setIsConfirmedTerm] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    city: '',
    district: '',
    ward: '',
    street: '',
  });

  const loadCart = async () => {
    try {
      setLoading(true);
      const { data } = await cartService.find();
      setCart(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        name: userData.name || '',
        phoneNumber: userData.phoneNumber || '',
      }));
      console.log('User data loaded:', userData);
    }
  }, [userData]);

  const steps = [
    { title: 'Thông tin giao hàng', icon: <UserOutlined /> },
    { title: 'Phương thức thanh toán', icon: <CreditCardOutlined /> },
    { title: 'Xác nhận đơn hàng', icon: <TruckOutlined /> },
  ];

  const calculateTotal = () => {
    if (!cart) return 0;
    return (
      cart.items.reduce((acc, item) => {
        return acc + (item.productId.price || 0) * item.quantity;
      }, 0) + 30000
    );
  };

  const validateStep0 = () => {
    if (!isConfirmedTerm) {
      message.error(
        'Vui lòng đồng ý với điều khoản sử dụng và điều kiện thanh toán',
      );
      return false;
    }
    if (!formData.name.trim()) {
      message.error('Vui lòng nhập họ tên');
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      message.error('Vui lòng nhập số điện thoại');
      return false;
    }

    if (!formData.city || !formData.district || !formData.street) {
      message.error('Vui lòng điền đầy đủ địa chỉ');
      return false;
    }
    return true;
  };

  const handlePayment = async (orderId: string) => {
    try {
      const rs = await paymentService.createPayment({
        orderId,
      });
      window.location.replace(rs.data);
    } catch (error) {
      message.error('Có lỗi xảy ra trong quá trình thanh toán');
    }
  };

  const handleSubmitOrder = async () => {
    if (!validateStep0()) return;
    try {
      // Chuẩn bị dữ liệu đơn hàng theo schema mới
      const orderData = {
        shippingAddress: {
          city: formData.city,
          district: formData.district,
          street: formData.street,
          ward: formData.ward,
        },
        paymentMethod,
        // Thêm phoneNumber vào dữ liệu đơn hàng
        phoneNumber: formData.phoneNumber,
        // Không cần truyền items và totalAmount vì backend sẽ tự tính từ giỏ hàng
      };

      const rs = await orderService.create(orderData);

      // Lưu orderId để hiển thị trong bước xác nhận
      setOrderId(rs.data._id);

      // Xử lý thanh toán nếu chọn phương thức chuyển khoản
      if(rs.data.paymentMethod === EPaymentMethod.BANK_TRANSFER) {
        handlePayment(rs.data._id);
      }

      // Cập nhật UI và xóa giỏ hàng
      setCurrentStep(2);
      message.success('Đặt hàng thành công');
      dispatch(clearCart());
    } catch (error) {
      console.error('Validation Error:', error);
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc');
    }
  };

  if (loading) {
    return <GeneralLoading isLoading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-6"
    >
      <Steps current={currentStep} className="mb-8">
        {steps.map((step, index) => (
          <Step
            key={index}
            title={step.title}
            icon={step.icon}
            className={currentStep >= index ? 'text-blue-600' : ''}
          />
        ))}
      </Steps>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <StepOne formData={formData} setFormData={setFormData} />
            )}

            {currentStep === 1 && (
              <StepTwo
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}

            {currentStep === 2 && <StepThree orderId={orderId} />}
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            {currentStep > 0 && currentStep < 2 && (
              <Button
                size="large"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Quay lại
              </Button>
            )}
            {currentStep < 2 && (
              <div className="flex justify-between mt-6">
                {currentStep < 2 && (
                  <Button
                    type="primary"
                    onClick={() => {
                      if (currentStep === 1) {
                        handleSubmitOrder();
                        return;
                      }
                      if (currentStep === 0 && !validateStep0()) return;
                      setCurrentStep((prev) => prev + 1);
                    }}
                  >
                    {currentStep === 1 ? 'Đặt hàng' : 'Tiếp tục'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-6"
          >
            <Card
              title="Đơn hàng của bạn"
              className="shadow-lg"
              extra={<ShoppingCartOutlined className="text-blue-600" />}
            >
              {cart?.items.map((item) => {
                return (
                  <div key={item._id} className="flex gap-4 py-3 border-b">
                    <img
                      src={buildImageUrl(item.productId.images[0])}
                      className="w-16 h-16 object-contain"
                      alt={item.productId.name}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.productId.name}</h4>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                        <span className="ml-auto">x{item.quantity}</span>
                      </div>
                      <div className="mt-1">
                        <span className="font-medium">
                          {formatCurrency(item.productId.price || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Divider />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>
                    {formatCurrency(calculateTotal() - 30000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span>30.000₫</span>
                </div>
                <Divider />
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="mt-4 shadow-lg">
              <Checkbox
                value={isConfirmedTerm}
                onChange={(e) => {
                  setIsConfirmedTerm(e.target.checked);
                }}
              >
                Tôi đồng ý với{' '}
                <a href="/terms" className="text-blue-600">
                  điều khoản dịch vụ
                </a>
              </Checkbox>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
