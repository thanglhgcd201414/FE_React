import { useState } from 'react';
import { Table, Tag, Modal, Select, Image, Typography, Avatar } from 'antd';
import { motion } from 'framer-motion';
import {
  EOrderStatus,
  EPaymentMethod,
  EPaymentStatus,
} from '../../../../constants/order-status';
import { IOrder } from '../../../../types/order.types';
import { formatCurrency } from '../../../../utils/format-money';
import {
  CreditCardOutlined,
  DollarOutlined,
  ShoppingOutlined,
  TagOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import OrderStatusTag from './OrderStatusTag';
import buildImageUrl from '../../../../utils/build-image-url';
import AddressInfo from '../../../app/home/history/AddressInfo';

const { Text, Title } = Typography;
const { Option } = Select;

const AdminOrdersPage = ({
  orders,
  onUpdateStatus,
}: {
  orders: IOrder[],
  onUpdateStatus: (orderId: string, newStatus: EOrderStatus) => Promise<void>,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      render: (text: string) => <Text strong>#{text}</Text>,
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (record: IOrder) => (
        <div>
          <div>{record.userId.name}</div>
          <Text type="secondary">{record.phoneNumber}</Text>
        </div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => (
        <Text strong className="text-green-700">
          {formatCurrency(amount)}
        </Text>
      ),
    },
    {
      title: 'Thanh toán',
      key: 'payment',
      render: (record: IOrder) => (
        <Tag
          color={record.paymentStatus === EPaymentStatus.PAID ? 'green' : 'red'}
          icon={
            record.paymentMethod === EPaymentMethod.BANK_TRANSFER ? (
              <CreditCardOutlined />
            ) : (
              <DollarOutlined />
            )
          }
        >
          {record.paymentStatus === EPaymentStatus.PAID
            ? 'Đã thanh toán'
            : 'Chưa thanh toán'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status: EOrderStatus) => <OrderStatusTag status={status} />,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  const handleStatusChange = async (newStatus: EOrderStatus) => {
    if (!selectedOrder) return;

    try {
      setLoading(true);
      await onUpdateStatus(selectedOrder._id, newStatus);
      setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
    } finally {
      setLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => setSelectedOrder(record),
        })}
        rowClassName="cursor-pointer hover:bg-gray-50"
        className="w-full"
      />

      <Modal
        title={
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <ShoppingOutlined className="text-blue-500 text-xl" />
            <Title level={4} className="!mb-0">
              Chi tiết đơn hàng #{selectedOrder?._id}
            </Title>
          </motion.div>
        }
        open={!!selectedOrder}
        onCancel={() => setSelectedOrder(null)}
        footer={
          <motion.div
            variants={itemVariants}
            className="flex justify-end p-4 bg-blue-50 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Text strong className="text-lg">
                Tổng cộng:
              </Text>
              <Text strong className="text-lg text-red-500">
                {formatCurrency(selectedOrder?.totalAmount)}
              </Text>
            </div>
          </motion.div>
        }
        width={800}
        className="rounded-lg"
      >
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 max-h-[480px] overflow-y-auto"
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <TagOutlined className="text-xl text-blue-500" />
                <Select
                  value={selectedOrder.orderStatus}
                  onChange={handleStatusChange}
                  loading={loading}
                  className="flex-1"
                >
                  {Object.values(EOrderStatus).map((status) => (
                    <Option key={status} value={status}>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <OrderStatusTag status={status} />
                      </motion.div>
                    </Option>
                  ))}
                </Select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <WalletOutlined className="text-xl text-green-500" />
                  <Text strong className="text-base">
                    Thanh toán
                  </Text>
                </div>
                <motion.div
                  className="flex items-center gap-4 p-3 bg-white rounded-md shadow-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  {selectedOrder.paymentMethod === EPaymentMethod.CAST ? (
                    <DollarOutlined className="text-2xl text-green-500" />
                  ) : (
                    <CreditCardOutlined className="text-2xl text-blue-500" />
                  )}
                  <Tag
                    color={
                      selectedOrder.paymentStatus === EPaymentStatus.PAID
                        ? 'green'
                        : 'red'
                    }
                  >
                    {selectedOrder.paymentMethod === EPaymentMethod.CAST
                      ? 'Tiền mặt'
                      : 'Chuyển khoản'}
                  </Tag>
                  <Text className="flex-1">
                    {selectedOrder.paymentStatus === EPaymentStatus.PAID
                      ? `Đã thanh toán - ${new Date(selectedOrder.updatedAt).toLocaleString()}`
                      : 'Chưa thanh toán'}
                  </Text>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <UserOutlined className="text-xl text-blue-500" />
                  <Text strong className="text-base">
                    Thông tin người đặt hàng
                  </Text>
                </div>
                <motion.div
                  className="flex items-center gap-4 p-3 bg-white rounded-md shadow-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className="flex flex-row justify-center items-center w-full">
                      <Avatar
                        src={buildImageUrl(selectedOrder.userId.avatar)}
                        size={84}
                      />
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-3">
                      <span>Tên:</span>
                      <Text strong>{selectedOrder.userId.name}</Text>
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-3">
                      <span>Email:</span>
                      <Text strong>{selectedOrder.userId.email}</Text>
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-3">
                      <span>Số điện thoại:</span>
                      <Text strong>{selectedOrder.userId.phoneNumber}</Text>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <AddressInfo order={selectedOrder} />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingOutlined className="text-xl text-orange-500" />
                  <Text strong className="text-base">
                    Sản phẩm
                  </Text>
                </div>
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {selectedOrder.items.map((item, index) => {
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex gap-4 p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Image
                          src={buildImageUrl(item.productId.images[0])}
                          width={80}
                          height={80}
                          className="rounded-lg object-contain border"
                          preview={false}
                        />
                        <div className="flex-1">
                          <Text strong className="block">
                            {item.productId.name}
                          </Text>
                          <div className="flex gap-2 mt-1">
                            {item.productId.categories.map((category, idx) => (
                              <Tag
                                key={idx}
                                color="blue"
                                className="flex items-center gap-1"
                              >
                                {category.name}
                              </Tag>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <Text>Số lượng: {item.quantity}</Text>
                            <Tag
                              color="geekblue"
                              className="flex items-center gap-1"
                            >
                              <Text strong>
                                {formatCurrency(item.productId.price)}
                              </Text>
                            </Tag>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </Modal>
    </>
  );
};

export default AdminOrdersPage;
