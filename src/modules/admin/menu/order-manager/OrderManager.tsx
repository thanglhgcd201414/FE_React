import { Empty, message, Select, Spin } from 'antd';
import * as React from 'react';
import { orderService } from '../../../../services';
import { IOrder } from '../../../../types/order.types';
import AdminOrdersPage from './AdminOrdersPage';
import { EOrderStatus, EPaymentStatus } from '../../../../constants/order-status';
import Visibility from '../../../../components/base/visibility';
import BaseSearch from '../../../../components/base/BaseSearch';
import OrderStatusTag from './OrderStatusTag';

export default function OrderManager() {
  const [query, setQuery] = React.useState<any>({
    page: 1,
    limit: 8,
    search: '',
    sort: 'DESC',
    orderStatus: undefined,
    paymentStatus: undefined 
  });
  const [ordersList, setOrdersList] = React.useState<IOrder[]>([]);
  const [loading, setLoading] = React.useState(false);

  const orderStatusOptions = Object.values(EOrderStatus).map(status => ({
    value: status,
    label: <OrderStatusTag status={status} />
  }));

  const paymentStatusOptions = Object.values(EPaymentStatus).map(status => ({
    value: status,
    label: status === EPaymentStatus.PAID ? 'Đã thanh toán' : 'Chưa thanh toán'
  }));

  const handleGetOrdersList = async () => {
    try {
      setLoading(true);
      const rs = await orderService.findAll(query);
      setOrdersList(rs.data.content);
      setQuery({
        ...query,
        total: rs.data.metaData.totalItem,
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
  }, [query.page, query.limit, query.orderStatus, query.paymentStatus]);

  return (
    <>
      <div className="flex flex-col justify-start items-start space-y-5 w-full">
        <h1 className="font-bold text-2xl">Quản lý danh sách đơn hàng</h1>
        <div className="flex flex-row justify-between items-center w-full">
          <BaseSearch
            value={query.search!}
            onHandleChange={(value) => {
              setQuery({ ...query, search: value });
            }}
            onSearch={() => handleGetOrdersList()}
          />
          <div className="flex gap-4">
            <Select
              placeholder="Lọc theo trạng thái"
              allowClear
              options={orderStatusOptions}
              value={query.orderStatus}
              onChange={(value) => setQuery((prev: any) => ({ 
                ...prev, 
                orderStatus: value,
                page: 1
              }))}
              className="min-w-[200px]"
            />
            <Select
              placeholder="Lọc theo thanh toán"
              allowClear
              options={paymentStatusOptions}
              value={query.paymentStatus}
              onChange={(value) => setQuery((prev: any) => ({ 
                ...prev, 
                paymentStatus: value,
                page: 1
              }))}
              className="min-w-[200px]"
            />
          </div>
        </div>
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
