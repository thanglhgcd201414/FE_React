import { useState } from 'react';
import { Modal, Rate, Button, Input, message, Tag, Typography } from 'antd';
import { StarFilled, CommentOutlined, SendOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { reviewService } from '../../../../services';
import { IOrder } from '../../../../types/order.types';
import { IItemCart } from '../../../../types/cart.types';
import buildImageUrl from '../../../../utils/build-image-url';
import { formatCurrency } from '../../../../utils/format-money';

const { Text } = Typography;

const ReviewModal = ({ order, onFetch }: { order: IOrder, onFetch: () => void; }) => {
  const [visible, setVisible] = useState(false);
  const [reviews, setReviews] = useState(
    order.items.map((item) => ({
      rating: 5,
      comment: '',
      sku: item.sku,
      productId: item.productId._id,
    })),
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const rs = await reviewService.create({
        orderId: order._id,
        data: reviews.map((review) => ({
          productId: review.productId,
          rating: review.rating,
          comment: review.comment,
        })),
      });
      message.success(rs.message ?? 'Đánh giá thành công!');
      setVisible(false);
      onFetch();
    } catch (error) {
      message.error('Đánh giá thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const getVariantDetails = (item: IItemCart) => {
    const variant = item.productId.variants.find((v) => v.sku === item.sku);
    return {
      color: variant?.color || 'N/A',
      storage: variant?.storageCapacity || 'N/A',
      price: variant?.price || 0,
    };
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          type="primary"
          block
          className="mt-4"
          onClick={() => setVisible(true)}
          icon={<StarFilled className="text-yellow-400" />}
          disabled={order.reviewed !== 'NOT_REVIEWED'}
        >
          {order.reviewed === 'REVIEWED' ? 'Đã đánh giá' : 'Đánh giá sản phẩm'}
        </Button>
      </motion.div>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <StarFilled className="text-2xl text-yellow-500" />
            <span className="text-xl font-semibold">Đánh giá sản phẩm</span>
          </div>
        }
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        width={800}
        destroyOnClose
      >
        <div className="space-y-8 py-4">
          {order.items.map((item, index) => {
            const variant = getVariantDetails(item);

            return (
              <div
                key={`${item.productId._id}-${item.sku}`}
                className="border-b pb-6 last:border-b-0"
              >
                <div className="flex gap-4 mb-4">
                  <img
                    src={
                      buildImageUrl(item.productId.images[0]) ||
                      '/placeholder-product.jpg'
                    }
                    alt={item.productId.name}
                    className="w-24 h-24 object-contain rounded-lg border"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {item.productId.name}
                    </h3>
                    <div className="mt-1">
                      <div className="flex gap-2 mt-1">
                        <Tag color="blue">{variant.color}</Tag>
                        <Tag>{variant?.storage}</Tag>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <Text>Số lượng: {item.quantity}</Text>
                        <Tag color="geekblue">
                          <Text strong className="text-black">
                            {formatCurrency(variant?.price)}
                          </Text>
                        </Tag>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <Rate
                      value={reviews[index].rating}
                      onChange={(value) =>
                        setReviews((prev) =>
                          prev.map((r, i) =>
                            i === index ? { ...r, rating: value } : r,
                          ),
                        )
                      }
                      character={<StarFilled className="text-2xl" />}
                      className="[&>.ant-rate-star]:mx-1 [&>.ant-rate-star]:!text-xl"
                    />
                    <div className="mt-1 text-sm text-gray-500">
                      {
                        ['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'][
                          reviews[index].rating - 1
                        ]
                      }
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CommentOutlined className="text-lg" />
                      <span className="font-medium">Nhận xét của bạn</span>
                    </div>
                    <Input.TextArea
                      rows={3}
                      value={reviews[index].comment}
                      onChange={(e) =>
                        setReviews((prev) =>
                          prev.map((r, i) =>
                            i === index ? { ...r, comment: e.target.value } : r,
                          ),
                        )
                      }
                      placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
                      className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2"
                      maxLength={500}
                      showCount
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={() => setVisible(false)}
              className="hover:bg-gray-100 px-6 h-10"
            >
              Hủy bỏ
            </Button>
            <Button
              type="primary"
              loading={loading}
              onClick={handleSubmit}
              icon={<SendOutlined className="text-lg" />}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 h-10 font-medium"
            >
              Gửi đánh giá
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReviewModal;
