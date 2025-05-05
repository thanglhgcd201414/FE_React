import { useState } from 'react';
import { Card, Row, Col, Tag, Table, Image } from 'antd';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarOutlined,
  ShoppingOutlined,
  StockOutlined,
  CalendarOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { IOrder } from '../../../../types/order.types';
import { IProduct } from '../../../../types/product.types';
import { formatCurrency } from '../../../../utils/format-money';
import buildImageUrl from '../../../../utils/build-image-url';

const DashboardPage = ({
  orders,
  products,
}: {
  orders: IOrder[],
  products: IProduct[],
}) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  const processRevenueData = () => {
    const dataMap = new Map<string, number>();

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      let key: string;

      switch (timeRange) {
        case 'week':
          key = `Tuần ${Math.ceil(orderDate.getDate() / 7)}`;
          break;
        case 'month':
          key = `Tháng ${orderDate.getMonth() + 1}`;
          break;
        case 'year':
          key = `Năm ${orderDate.getFullYear()}`;
          break;
        default:
          key = orderDate.toISOString().split('T')[0];
      }

      const total = dataMap.get(key) || 0;
      dataMap.set(key, total + order.totalAmount);
    });

    return Array.from(dataMap).map(([name, value]) => ({ name, value }));
  };

  const processTopProducts = () => {
    const productSales = new Map<
      string,
      { product: IProduct, total: number, quantity: number }
    >();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find((p) => p._id === item.productId?._id);
        if (!product) return;

        const current = productSales.get(product._id) || {
          product,
          total: 0,
          quantity: 0,
        };
        current.total += item.quantity * item.productId.price || 0;
        current.quantity += item.quantity;
        productSales.set(product._id, current);
      });
    });

    return Array.from(productSales.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  };

  const revenueData = processRevenueData();
  const topProducts = processTopProducts();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <StockOutlined className="text-blue-500" />
          Bảng điều khiển thống kê
        </h1>

        <div className="flex gap-2">
          <Tag.CheckableTag
            checked={timeRange === 'week'}
            onChange={() => setTimeRange('week')}
            className="!flex items-center gap-1"
          >
            <CalendarOutlined /> Theo tuần
          </Tag.CheckableTag>
          <Tag.CheckableTag
            checked={timeRange === 'month'}
            onChange={() => setTimeRange('month')}
            className="!flex items-center gap-1"
          >
            <CalendarOutlined /> Theo tháng
          </Tag.CheckableTag>
          <Tag.CheckableTag
            checked={timeRange === 'year'}
            onChange={() => setTimeRange('year')}
            className="!flex items-center gap-1"
          >
            <CalendarOutlined /> Theo năm
          </Tag.CheckableTag>
        </div>
      </div>

      <Row gutter={16} className="!mx-0">
        <Col span={8}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarOutlined className="text-2xl text-blue-500" />
              </div>
              <div>
                <h3 className="text-gray-500">Tổng doanh thu</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(
                    orders.reduce((acc, order) => acc + order.totalAmount, 0),
                  )}
                </p>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <ShoppingOutlined className="text-2xl text-green-500" />
              </div>
              <div>
                <h3 className="text-gray-500">Tổng đơn hàng</h3>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </Card>
        </Col>

      </Row>

      <Card
        title={
          <div className="flex items-center gap-2">
            <StockOutlined className="text-blue-500" />
            Biểu đồ doanh thu
          </div>
        }
        className="shadow-lg"
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                formatCurrency(value as number),
                'Doanh thu',
              ]}
              labelStyle={{ fontWeight: 500 }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ fill: '#6366f1', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
 
    </div>
  );
};

export default DashboardPage;
