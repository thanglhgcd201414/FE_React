import {
  ClockCircleOutlined,
  TruckOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import {
  Tabs,
  Card,
  Tag,
  Divider,
  List,
  Typography,
  Button,
  message,
  Modal,
} from 'antd';
import { motion } from 'framer-motion';
import { IOrder } from '../../../../types/order.types';
import { formatCurrency } from '../../../../utils/format-money';
import {
  EOrderStatus,
  EPaymentMethod,
  EPaymentStatus,
} from '../../../../constants/order-status';
import OrderInfo from './OrderInfo';
import DisplayItems from './DisplayItems';
import AddressInfo from './AddressInfo';
import { orderService, paymentService } from '../../../../services';
import Visibility from '../../../../components/base/visibility';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const OrderHistoryPage = ({
  orders,
  onFetch,
}: {
  orders: IOrder[],
  onFetch: () => void,
}) => {
  const statusConfig = {
    PROCESSING: {
      color: 'blue',
      icon: <ClockCircleOutlined />,
      label: 'Đang xử lý',
    },
    SHIPPING: {
      color: 'orange',
      icon: <TruckOutlined />,
      label: 'Đang vận chuyển',
    },
    DELIVERED: {
      color: 'green',
      icon: <CheckCircleOutlined />,
      label: 'Đã giao hàng',
    },
    CANCELLED: { color: 'red', icon: <CloseCircleOutlined />, label: 'Đã hủy' },
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

  const handleCancelOrder = async (orderId: string) => {
    Modal.confirm({
      title: 'Xác nhận hủy đơn hàng',
      content: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      style: {
        top: '50%',
        transform: 'translateY(-50%)',
      },
      onOk: async () => {
        try {
          const rs = await orderService.cancelOrder(orderId);
          message.success(rs.message);
          onFetch();
        } catch (error) {
          message.error('Có lỗi xảy ra trong quá trình thanh toán');
        }
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 min-w-[1180px]">
      <Title level={3} className="mb-6">
        Lịch sử mua hàng
      </Title>

      <Tabs defaultActiveKey={EOrderStatus.PROCESSING} className="w-full">
        {Object.entries(statusConfig).map(([key, { color, icon, label }]) => (
          <TabPane
            key={key}
            tab={
              <span className="flex items-center gap-2">
                {icon}
                {label}
              </span>
            }
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <List
                dataSource={orders.filter((order) => order.orderStatus === key)}
                renderItem={(order) => {
                  return (
                    <Card key={order._id} className="mb-4 shadow-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <OrderInfo
                            order={order}
                            color={color}
                            icon={icon}
                            label={label}
                          />

                          <Divider className="my-4" />

                          <DisplayItems order={order} />
                        </div>

                        <div className="border-l pl-4">
                          <div className="space-y-4">
                            <AddressInfo order={order} />

                            <Divider className="my-4" />

                            <div className="space-y-4">
                              <Text strong className="block mb-2">
                                Thanh toán
                              </Text>

                              <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                  <Text className="font-medium">
                                    Tổng tiền:
                                  </Text>
                                  <Text
                                    strong
                                    className="text-green-500 text-lg"
                                  >
                                    {formatCurrency(order.totalAmount)}
                                  </Text>
                                </div>

                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Card className="shadow-sm">
                                    {order.paymentMethod ===
                                    EPaymentMethod.CAST ? (
                                      <div className="flex items-center gap-4 p-2">
                                        <TruckOutlined className="text-2xl text-green-600" />
                                        <div>
                                          <h4 className="font-semibold text-green-600">
                                            Thanh toán khi nhận hàng (COD)
                                          </h4>
                                          <p className="text-gray-500">
                                            Phí ship nội thành: 30,000 đ
                                          </p>
                                          <p className="text-gray-500">
                                            Phí xử lý: 0đ
                                          </p>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-start">
                                        <div className="flex flex-row items-center gap-4 p-2">
                                          <WalletOutlined className="text-2xl text-orange-600" />
                                          <div>
                                            <h4 className="font-semibold text-orange-600">
                                              Ví điện tử VNPay
                                              <Tag
                                                color={
                                                  order.paymentStatus ===
                                                  EPaymentStatus.PAID
                                                    ? 'green'
                                                    : 'red'
                                                }
                                                className="ml-2"
                                              >
                                                {order.paymentStatus ===
                                                EPaymentStatus.PAID
                                                  ? 'Đã thanh toán'
                                                  : 'Chưa thanh toán'}
                                              </Tag>
                                            </h4>

                                            <p className="text-gray-500">
                                              {order.paymentStatus ===
                                              EPaymentStatus.PAID
                                                ? `Đã thanh toán lúc ${new Date(order.updatedAt).toLocaleString()}`
                                                : 'Vui lòng hoàn tất thanh toán'}
                                            </p>
                                          </div>
                                        </div>
                                        <Visibility
                                          visibility={
                                            order.paymentStatus ===
                                              EPaymentStatus.UNPAID &&
                                            order.orderStatus !==
                                              EOrderStatus.CANCELLED
                                          }
                                        >
                                          <Button
                                            danger
                                            block
                                            type="primary"
                                            className="mt-4 w-full"
                                            onClick={() => {
                                              handlePayment(order._id);
                                            }}
                                          >
                                            Thanh toán ngay
                                          </Button>
                                        </Visibility>
                                      </div>
                                    )}
                                  </Card>
                                </motion.div>
                              </div>

                              {order.orderStatus ===
                                EOrderStatus.PROCESSING && (
                                <motion.div whileHover={{ scale: 1.02 }}>
                                  <Button
                                    danger
                                    block
                                    className="mt-4"
                                    onClick={() => {
                                      handleCancelOrder(order._id);
                                    }}
                                  >
                                    Hủy đơn hàng
                                  </Button>
                                </motion.div>
                              )}
                            </div>

                            {/* {order.orderStatus === EOrderStatus.DELIVERED &&
                              order.reviewed ===
                                EOrderReviewed.NOT_REVIEWED && (
                                <ReviewModal
                                order={order}
                                onFetch={onFetch}
                                />
                              )} */}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                }}
              />
            </motion.div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default OrderHistoryPage;
