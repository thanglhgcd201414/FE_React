import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Divider, Steps, Checkbox, message, Modal } from 'antd';
import {
  CreditCardOutlined,
  TruckOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import buildImageUrl from '../../../../utils/build-image-url';
import { cartService, orderService } from '../../../../services';
import { ICart } from '../../../../types/cart.types';
import { EPaymentMethod, EPaymentStatus } from '../../../../constants/order-status';
import GeneralLoading from '../../../../components/base/GeneralLoading';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import { formatCurrency } from '../../../../utils/format-money';
import PayPalPayment from '../../../../components/payment/PayPalPayment';
import { getUserData, clearCart, setCartData } from '../../../../utils/localStorage';

const { Step } = Steps;

const CheckoutPage = () => {
  const [userData] = useState(getUserData());
  const [cart, setCart] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<EPaymentMethod>(
    EPaymentMethod.PAYPAL,
  );
  const [orderId, setOrderId] = useState<string>('');
  const [isConfirmedTerm, setIsConfirmedTerm] = useState<boolean>(false);
  const [isPayPalModalVisible, setIsPayPalModalVisible] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<any>(null);

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
      }, 0) + 30
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

  // Không cần hàm handlePayment vì chỉ sử dụng PayPal

  // Chuẩn bị dữ liệu đơn hàng
  const prepareOrderData = () => {
    return {
      shippingAddress: {
        city: formData.city,
        district: formData.district,
        street: formData.street,
        ward: formData.ward,
      },
      paymentMethod,
      phoneNumber: formData.phoneNumber,
    };
  };

  // Xử lý thanh toán PayPal
  const handlePayPalPayment = () => {
    if (!validateStep0()) return;

    // Chuẩn bị dữ liệu đơn hàng
    const orderDataPrepared = prepareOrderData();
    console.log("Preparing PayPal payment with data:", orderDataPrepared);
    console.log("Total amount for PayPal:", calculateTotal());

    // Hiển thị modal PayPal
    setOrderData(orderDataPrepared);
    setIsPayPalModalVisible(true);
  };

  // Xử lý khi thanh toán PayPal thành công
  const handlePayPalSuccess = async (details: any) => {
    try {
      setLoading(true);
      console.log("PayPal payment successful with details:", details);

      // Tạo đơn hàng với thông tin thanh toán PayPal
      const data = {
        ...orderData,
        paymentMethod: EPaymentMethod.PAYPAL,
        paymentStatus: EPaymentStatus.PAID, // Đánh dấu là đã thanh toán
        metadata: {
          paypalTransactionId: details.id,
          paypalOrderId: details.id,
        }
      };

      
      //lay data gui ve BE de tao lich su giao dich don hang
      const rs = await orderService.create(data);
      
      // Lưu orderId để hiển thị trong bước xác nhận
      setOrderId(rs.data._id);

      // Đóng modal PayPal
      setIsPayPalModalVisible(false);

      // Cập nhật UI và xóa giỏ hàng
      setCurrentStep(2);
      message.success('Thanh toán thành công và đơn hàng đã được tạo');

      // Xóa giỏ hàng cũ
      clearCart();

      // Tạo giỏ hàng mới ngay lập tức
      try {
        console.log("Creating new cart after checkout...");
        const cartResponse = await cartService.find();
        console.log("New cart created:", cartResponse.data);
        setCartData(cartResponse.data);
      } catch (cartError) {
        console.error("Error creating new cart:", cartError);
      }
    } catch (error) {
      console.error('PayPal Payment Error:', error);
      message.error('Có lỗi xảy ra trong quá trình thanh toán: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    if (!validateStep0()) return;

    // Luôn hiển thị modal PayPal vì chỉ có một phương thức thanh toán
    handlePayPalPayment();
  };

  if (loading) {
    return <GeneralLoading isLoading />;
  }

  return (
    <>
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
                      {formatCurrency(calculateTotal() - 30)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{formatCurrency(30)}</span>
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

      {/* Modal PayPal */}
      <Modal
        title="Thanh toán qua PayPal"
        open={isPayPalModalVisible}
        onCancel={() => setIsPayPalModalVisible(false)}
        footer={null}
        width={500}
        destroyOnClose={true}
      >
        <div className="py-4">
          <p className="mb-4 text-center">Tổng thanh toán: <span className="font-bold text-red-600">{formatCurrency(calculateTotal())}</span></p>
          <div className="border p-4 rounded-lg bg-gray-50">
            <PayPalPayment
              amount={calculateTotal()}
              //goi onsuccess khi kq tra ve thanh toan thanh cong de tao don hang oder vao db
              onSuccess={handlePayPalSuccess}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CheckoutPage;
