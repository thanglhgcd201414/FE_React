import { useEffect, useState } from 'react';
import { IOrder } from '../../../../types/order.types';
import { orderService } from '../../../../services';
import Visibility from '../../../../components/base/visibility';
import OrderHistoryPage from './OrderHistoryPage';
import { Empty, Pagination, Spin } from 'antd';

export default function History() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    limit: 3,
    total: 0,
  });
  const [orders, setOrders] = useState<IOrder[]>([]);

  const handleGetListOrder = async () => {
    setLoading(true);
    try {
      const rs = await orderService.findAll(query);

      // Lọc bỏ các đơn hàng có trạng thái CANCELLED
      const filteredOrders = rs.data.content.filter(
        (order) => (order.orderStatus as string) !== 'CANCELLED'
      );

      setOrders(filteredOrders);
      setQuery((prev) => ({ ...prev, total: filteredOrders.length }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetListOrder();
  }, [query.page]);


  return (
    <Visibility
      visibility={orders.length}
      suspenseComponent={
        loading ? (
          <Spin />
        ) : (
          <Empty description="Không tìm thấy đơn đặt hàng nào" />
        )
      }
    >
      <OrderHistoryPage orders={orders} onFetch={handleGetListOrder}/>
      <div className="mt-8 flex justify-center">
        <Pagination
          current={query.page}
          pageSize={query.limit}
          total={query.total}
          onChange={(page, pageSize) =>
            setQuery((prev) => ({ ...prev, page, limit: pageSize }))
          }
          className="ant-pagination-custom"
        />
      </div>
    </Visibility>
  );
}
