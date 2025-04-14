import { CloseCircleFilled, WarningOutlined } from '@ant-design/icons';
import { Button, Card, Typography, Space } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DEFINE_USER_ROUTERS } from '../../constants/route-mapper';
import { formatCurrency } from '../../utils/format-money';

const { Title, Text } = Typography;

const PaymentErrorPage = ({ order }: { order: any }) => {
  return (
    <div className="min-h-[680px] bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden w-full">
      <motion.div
        className="absolute w-96 h-96 bg-red-100 rounded-full opacity-20 -top-48 -right-48"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-64 h-64 bg-red-100 rounded-full opacity-20 -bottom-32 -left-32"
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
          <CloseCircleFilled className="text-6xl text-red-500" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Title level={2} className="text-center mb-2 text-red-600">
            Thanh toán thất bại!
          </Title>
          <Text type="secondary" className="text-center block mb-8">
            Đã xảy ra lỗi trong quá trình xử lý thanh toán. Vui lòng thử lại.
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
                <WarningOutlined /> Mã lỗi:
              </Text>
              <Text>PAYMENT_FAILED</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Phương thức thanh toán:</Text>
              <Text className="text-red-600">Chuyển khoản qua VNPay</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Mô tả lỗi:</Text>
              <Text className="text-red-600">Giao dịch bị từ chối</Text>
            </div>
            <div className="flex justify-between">
              <Text strong>Số tiền:</Text>
              <Text>{formatCurrency(order.totalAmount)}</Text>
            </div>
          </Space>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center"
        >
          <Link to={DEFINE_USER_ROUTERS.orderHistory}>
            <Button
              type="primary"
              size="large"
              className="bg-red-600 hover:bg-red-700 h-12 px-8 rounded-lg"
            >
              Thử lại thanh toán
            </Button>
          </Link>
          <Link to={DEFINE_USER_ROUTERS.contactUs}>
            <Button
              size="large"
              className="h-12 px-8 rounded-lg border-red-600 text-red-600 hover:bg-red-50"
            >
              Liên hệ hỗ trợ
            </Button>
          </Link>
        </motion.div>
      </Card>
    </div>
  );
};

export default PaymentErrorPage;
