import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import {
  Tabs,
  Card,
  Tag,
  Divider,
  List,
  Typography,
} from 'antd';
import { motion } from 'framer-motion';
import { IOrder } from '../../../../types/order.types';
import { formatCurrency } from '../../../../utils/format-money';
import { EOrderStatus } from '../../../../constants/order-status';
import OrderInfo from './OrderInfo';
import DisplayItems from './DisplayItems';
import AddressInfo from './AddressInfo';
// Không cần import orderService vì đã loại bỏ chức năng hủy đơn hàng

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const OrderHistoryPage = ({
  orders,
}: {
  orders: IOrder[],
  onFetch?: () => void, // Đánh dấu là optional vì không sử dụng
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
    // Đã loại bỏ trạng thái CANCELLED
  };

  // Không cần hàm handlePayment vì chỉ sử dụng PayPal

  // Đã loại bỏ hàm handleCancelOrder vì đơn hàng PayPal không thể hủy

  return (
    <div className="max-w-6xl mx-auto p-4 min-w-[1180px]">
      <Title level={3} className="mb-6">
        Lịch sử mua hàng
      </Title>

      <Tabs defaultActiveKey={EOrderStatus.PROCESSING} className="w-full">
        {/* Chỉ hiển thị các tab cho các trạng thái được hỗ trợ */}
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
                dataSource={orders.filter((order) =>
                  // Lọc bỏ các đơn hàng có trạng thái CANCELLED và chỉ hiển thị đơn hàng có trạng thái hiện tại
                  order.orderStatus === key && (order.orderStatus as string) !== 'CANCELLED'
                )}
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
                                    <div className="flex items-center gap-4 p-2">
                                      <img
                                        src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                                        alt="PayPal"
                                        className="w-6 h-6"
                                      />
                                      <div>
                                        <h4 className="font-semibold text-blue-600">
                                          Thanh toán qua PayPal
                                          <Tag
                                            color="green"
                                            className="ml-2"
                                          >
                                            Đã thanh toán
                                          </Tag>
                                        </h4>
                                        <p className="text-gray-500">
                                          Đã thanh toán lúc {new Date(order.updatedAt).toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                  </Card>
                                </motion.div>
                              </div>

                              {/* Đã loại bỏ nút hủy đơn hàng vì đơn hàng PayPal không thể hủy */}
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
