import { Tag } from 'antd';
import {
  ClockCircleOutlined,
  TruckOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { EOrderStatus } from '../../../../constants/order-status';

const statusConfig = {
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
  [EOrderStatus.CANCELLED]: {
    color: 'red',
    icon: <CloseCircleOutlined />,
    label: 'Đã hủy',
  },
};

const OrderStatusTag = ({ status }: { status: EOrderStatus }) => {
  const config = statusConfig[status];
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
