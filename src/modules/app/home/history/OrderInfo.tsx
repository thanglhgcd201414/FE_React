import { Tag, Typography } from 'antd';
import { IOrder } from '../../../../types/order.types';

interface IProps {
  order: IOrder;
  color: string;
  icon: React.ReactNode;
  label: string;
}
const { Text } = Typography;

export default function OrderInfo({ order, color, icon, label }: IProps) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        {/* <Text strong className="text-lg">
          Mã đơn hàng: {order.shippingAddress}
        </Text> */}
        <div className="mt-1">
          <Tag
            color={color}
            icon={icon}
            className="flex items-center gap-1 max-w-[160px]"
          >
            {label}
          </Tag>
        </div>
      </div>
      <Text type="secondary">
        {new Date(order.createdAt).toLocaleDateString()}
      </Text>
    </div>
  );
}
