import { Alert, Button, Card, Divider, Tag } from 'antd';
import { motion } from 'framer-motion';
import { CheckCircleOutlined } from '@ant-design/icons';

interface IProps {
  trackingNumber?: string;
}

export default function StepThree({ trackingNumber }: IProps) {
  return (
    <motion.div
      key="step3"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <Card
        title="Xác nhận đơn hàng"
        className="shadow-lg"
        extra={<CheckCircleOutlined className="text-green-600" />}
      >
        <Alert
          message="Đơn hàng đã được tiếp nhận!"
          description="Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng."
          type="success"
          showIcon
          className="mb-6"
        />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Mã đơn hàng:</span>
            <Tag color="blue">{trackingNumber}</Tag>
          </div>
          <Divider />
          <Button type="primary" onClick={() => (window.location.href = '/')}>
            Quay về trang chủ
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
