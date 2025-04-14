import { IProduct } from '../../../../types/product.types';
import { Card, Rate, Pagination, Select, Spin } from 'antd';
import { IReview } from '../../../../types/review';
import React from 'react';
import { reviewService } from '../../../../services';

interface IProps {
  product?: IProduct | null;
}

export default function ProductRating({ product }: IProps) {
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 8,
    sort: 'DESC',
    total: 0,
  });
  const [listReview, setListReview] = React.useState<IReview[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleGetReviews = async () => {
    if (product?._id) {
      try {
        setLoading(true);
        const rs = await reviewService.findAll(
          product._id,
          query,
        );
        setListReview(rs.data.content);
        setQuery((prev) => ({ ...prev, total: rs.data.metaData.totalItem }));
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    handleGetReviews();
  }, [product?._id, query.page, query.limit, query.sort]);

  const handlePageChange = (page: number, pageSize?: number) => {
    setQuery((prev) => ({
      ...prev,
      page,
      limit: pageSize || prev.limit,
    }));
  };

  const handleSortChange = (value: string) => {
    setQuery((prev) => ({
      ...prev,
      sort: value,
      page: 1,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Đánh giá ({query.total})</h3>

        <Select
          defaultValue="DESC"
          style={{ width: 120 }}
          onChange={handleSortChange}
          options={[
            { value: 'DESC', label: 'Mới nhất' },
            { value: 'ASC', label: 'Cũ nhất' },
          ]}
        />
      </div>

      <Spin spinning={loading}>
        {listReview.map((review) => (
          <Card key={review._id} className="mb-4">
            <div className="flex items-center gap-4">
              <Rate disabled value={review.rating} />
              <span className="font-medium">
                {review.userId?.name || review.userId?.email}
              </span>
              <span className="text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2">{review.comment}</p>
          </Card>
        ))}

        {query.total > 0 && (
          <div className="flex justify-center mt-6">
            <Pagination
              current={query.page}
              pageSize={query.limit}
              total={query.total}
              onChange={handlePageChange}
              pageSizeOptions={['8', '16', '24']}
            />
          </div>
        )}
      </Spin>

      {!loading && listReview.length === 0 && (
        <div className="text-center text-gray-500">
          Chưa có đánh giá nào cho sản phẩm này
        </div>
      )}
    </div>
  );
}
