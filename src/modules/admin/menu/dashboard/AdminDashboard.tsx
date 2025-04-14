import { useEffect, useState } from "react";
import { IOrder } from "../../../../types/order.types";
import { IProduct } from "../../../../types/product.types";
import { orderService, productService } from "../../../../services";
import DashboardPage from "./DashboardPage";
import { EOrderStatus } from "../../../../constants/order-status";

const AdminDashboard = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const ordersRes = await orderService.findAll({page: 1, limit: 1000, orderStatus: EOrderStatus.DELIVERED});
      const productsRes = await productService.findAll({page: 1, limit: 1000});
      setOrders(ordersRes.data.content);
      setProducts(productsRes.data.content);
    };
    loadData();
  }, []);

  return <DashboardPage orders={orders} products={products} />;
};

export default AdminDashboard;
