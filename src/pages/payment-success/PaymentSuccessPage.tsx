import {
  CheckCircleFilled,
  ShoppingOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { Button, Card, Typography, Space } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DEFINE_USER_ROUTERS } from '../../constants/route-mapper';
import { formatCurrency } from '../../utils/format-money';

const { Title, Text } = Typography;

const PaymentSuccessPage = ({ order }: { order: any }) => {
  return (
    <div className="min-h-[680px] w-full bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 bg-green-100 rounded-full opacity-20 -top-48 -right-48"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-green-100 rounded-full opacity-20 -bottom-32 -left-32"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <Card className="max-w-2xl w-full shadow-lg z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-8"
        >
          <CheckCircleFilled className="text-6xl text-green-500" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Title level={2} className="text-center mb-2 text-green-600">
            Thanh toán thành công!
          </Title>
          <Text type="secondary" className="text-center block mb-8">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xử lý thành công.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 rounded-lg p-6 mb-8"
        >
          <Space direction="vertical" className="w-full">
            <div className="flex justify-between">
              <Text strong>
                <ShoppingOutlined /> Mã đơn hàng:
              </Text>
              <Text>{order.trackingNumber}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>
                <DollarOutlined /> Tổng tiền:
              </Text>
              <Text className="text-green-600">{formatCurrency(order.totalAmount)}</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Phương thức thanh toán:</Text>
              <Text>Chuyển khoảng qua VNPay</Text>
            </div>
          </Space>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link to={DEFINE_USER_ROUTERS.home}>
            <Button
              type="primary"
              size="large"
              className="bg-green-600 hover:bg-green-700 h-12 px-8 rounded-lg"
            >
              Quay về trang chủ
            </Button>
          </Link>
        </motion.div>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
