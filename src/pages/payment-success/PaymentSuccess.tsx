import { useParams } from 'react-router-dom';
import { orderService } from '../../services';
import { IOrder } from '../../types/order.types';
import React from 'react';
import PaymentSuccessPage from './PaymentSuccessPage';
import Visibility from '../../components/base/visibility';
import { Empty, Spin } from 'antd';

export default function PaymentSuccess() {
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
      <PaymentSuccessPage order={order} />
    </Visibility>
  );
}
