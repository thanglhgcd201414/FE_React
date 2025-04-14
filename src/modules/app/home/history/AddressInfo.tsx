import { EnvironmentOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { IOrder } from '../../../../types/order.types';

type Props = {
  order: IOrder,
};

const { Text } = Typography;

const DisplayItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-row items-start gap-2 hover:bg-gray-50 p-2 rounded transition-colors">
    <span className='text-sm whitespace-nowrap'>{label}:</span>
    <Text className="font-medium">{value}</Text>
  </div>
);

export default function AddressInfo({ order }: Props) {
  const DEFINE_ADDRESS = [
    {
      label: 'Tỉnh/thành phố',
      value: order.shippingAddress.city,
    },
    {
      label: 'Quận/huyện',
      value: order.shippingAddress.district,
    },
    {
      label: 'Phường/xã',
      value: order.shippingAddress.ward,
    },
    {
      label: 'Địa chỉ đường',
      value: order.shippingAddress.street,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <EnvironmentOutlined className="text-blue-600 text-lg" />
        <Text strong className="text-base">
          Địa chỉ giao hàng
        </Text>
      </div>

      <div className="flex flex-col gap-0.5 pl-2 border-l-2 border-dashed border-blue-100">
        {DEFINE_ADDRESS.map((_item, index) => (
          <DisplayItem key={index} label={_item.label} value={_item.value} />
        ))}
      </div>
    </div>
  );
}
