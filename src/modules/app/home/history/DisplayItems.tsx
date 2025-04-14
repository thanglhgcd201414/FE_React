import { IOrder } from '../../../../types/order.types';
import { Image, Tag, Typography } from 'antd';
import buildImageUrl from '../../../../utils/build-image-url';
import { formatCurrency } from '../../../../utils/format-money';

type Props = {
  order: IOrder,
};
const { Text } = Typography;

export default function DisplayItems({ order }: Props) {
  return (
    <div className="space-y-4">
      {order.items.map((item) => {
        const selectedVariant = item.productId.variants.find(
          (_variant) => _variant.sku === item.sku,
        );
        return (
          <div key={item.sku} className="flex gap-4">
            <Image
              src={buildImageUrl(item.productId.images[0])}
              width={80}
              height={80}
              className="rounded-lg object-contain"
              preview={false}
            />
            <div className="flex-1">
              <Text strong className="block">
                {item.productId.name}
              </Text>
              <div className="flex gap-2 mt-1">
                <Tag color="blue">{selectedVariant?.color}</Tag>
                <Tag>{selectedVariant?.storageCapacity}</Tag>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Text>Số lượng: {item.quantity}</Text>
                <Tag color='geekblue'>
                  <Text strong className="text-black">
                    {formatCurrency(selectedVariant?.price)}
                  </Text>
                </Tag>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
