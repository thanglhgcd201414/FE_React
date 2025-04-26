import { Empty, message, Spin } from 'antd';
import * as React from 'react';
import { orderService } from '../../../../services';
import { IOrder } from '../../../../types/order.types';
import AdminOrdersPage from './AdminOrdersPage';
import { EOrderStatus } from '../../../../constants/order-status';
import Visibility from '../../../../components/base/visibility';



export default function OrderManager() {
  const [query, setQuery] = React.useState<any>({
    page: 1,
    limit: 8,
    sort: 'DESC'
  });
  const [ordersList, setOrdersList] = React.useState<IOrder[]>([]);
  const [loading, setLoading] = React.useState(false);



  const handleGetOrdersList = async () => {
    try {
      setLoading(true);
      const rs = await orderService.findAll(query);

      // Lọc bỏ các đơn hàng có trạng thái CANCELLED
      const filteredOrders = rs.data.content.filter(
        (order) => (order.orderStatus as string) !== 'CANCELLED'
      );

      setOrdersList(filteredOrders);
      setQuery({
        ...query,
        total: filteredOrders.length,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: EOrderStatus) => {
    try {
      setLoading(true);
      const rs = await orderService.updateOrderStatus(orderId, { orderStatus: newStatus });
      message.success(rs.message);
      handleGetOrdersList();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    handleGetOrdersList();
  }, [query.page, query.limit]);

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">Quản lý danh sách đơn hàng</h1>

        <Visibility
          visibility={ordersList}
          suspenseComponent={
            loading ? (
              <Spin />
            ) : (
              <Empty description="Không có đơn hàng nào được đặt" />
            )
          }
        >
          <AdminOrdersPage
            orders={ordersList}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        </Visibility>
      </div>
    </>
  );
}
