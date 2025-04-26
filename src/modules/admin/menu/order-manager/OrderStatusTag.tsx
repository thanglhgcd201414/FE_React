import { Tag } from 'antd';
import {
  ClockCircleOutlined,
  TruckOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { EOrderStatus } from '../../../../constants/order-status';

// Định nghĩa kiểu cho cấu hình trạng thái
type StatusConfigType = {
  [key: string]: {
    color: string;
    icon: React.ReactNode;
    label: string;
  };
};

const statusConfig: StatusConfigType = {
  [EOrderStatus.PROCESSING]: {
    color: 'blue',
    icon: <ClockCircleOutlined />,
    label: 'Đang xử lý',
  },
  [EOrderStatus.SHIPPING]: {
    color: 'orange',
    icon: <TruckOutlined />,
    label: 'Đang vận chuyển',
  },
  [EOrderStatus.DELIVERED]: {
    color: 'green',
    icon: <CheckCircleOutlined />,
    label: 'Đã giao hàng',
  },
  // Đã loại bỏ trạng thái CANCELLED
};

const OrderStatusTag = ({ status }: { status: string }) => {
  // Sử dụng cấu hình mặc định nếu không tìm thấy trạng thái
  const config = statusConfig[status] || {
    color: 'default',
    icon: <ClockCircleOutlined />,
    label: status || 'Không xác định',
  };

  return (
    <Tag
      color={config.color}
      icon={config.icon}
      className="flex items-center gap-1 max-w-[200px]"
    >
      {config.label}
    </Tag>
  );
};

export default OrderStatusTag;
