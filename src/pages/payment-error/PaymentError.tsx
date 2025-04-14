import React from 'react';
import { useParams } from 'react-router-dom';
import { IOrder } from '../../types/order.types';
import { orderService } from '../../services';
import PaymentErrorPage from './PaymentErrorPage';
import Visibility from '../../components/base/visibility';
import { Empty, Spin } from 'antd';

export default function PaymentError() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = React.useState<IOrder>();
  const [loading, setLoading] = React.useState(false);

  const handleGetOrder = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const rs = await orderService.findOne(id);
      setOrder(rs.data);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetOrder();
  }, []);

  return (
    <Visibility
      visibility={order}
      suspenseComponent={
        loading ? <Spin /> : <Empty description="Không tìm thấy đơn hàng" />
      }
    >
      <PaymentErrorPage order={order} />
    </Visibility>
  );
}
