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
        return (
          <div key={`${item.productId?._id || Math.random()}-${item.quantity}`} className="flex gap-4">
            <Image
              src={item.productId && item.productId.images && item.productId.images.length > 0
                ? buildImageUrl(item.productId.images[0])
                : "https://placehold.co/80x80?text=No+Image"}
              width={80}
              height={80}
              className="rounded-lg object-contain"
              preview={false}
              alt={item.productId?.name || "Product image"}
            />
            <div className="flex-1">
              <Text strong className="block">
                {item.productId?.name || "Sản phẩm không xác định"}
              </Text>
              <div className="flex gap-2 mt-1">
                {item.productId?.categories?.length > 0
                  ? item.productId.categories.map((category, index) => (
                      <Tag key={index} color="blue">{category.name || "Không có danh mục"}</Tag>
                    ))
                  : <Tag color="blue">Không có danh mục</Tag>
                }
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Text>Số lượng: {item.quantity}</Text>
                <Tag color='geekblue'>
                  <Text strong className="text-black">
                    {formatCurrency(item.productId?.price || 0)}
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
