/**
 * Cấu hình định tuyến cho ứng dụng thương mại điện tử WinMobile
 *
 * File này định nghĩa tất cả các tuyến đường cho cả phần người dùng và phần quản trị của ứng dụng.
 * Định tuyến được tổ chức thành một số phần chính:
 * 1. Layout người dùng chính với trang chủ, sản phẩm, giỏ hàng và trang thanh toán
 * 2. Layout xác thực cho đăng nhập và đăng ký
 * 3. Layout quản trị với bảng điều khiển, quản lý sản phẩm, danh mục và đơn hàng
 */
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/not-found';

// Các thành phần quản trị
import AdminPage from '../modules/admin/AdminPage';
import TheLayoutAdmin from '../modules/admin/layout/TheLayoutAdmin';
import LoginAdmin from '../modules/admin/auth/LoginAdmin';
import ProductsManager from '../modules/admin/menu/product-manager/ProductsManger';
import EditProduct from '../modules/admin/menu/product-manager/EditProduct';
import CreateProduct from '../modules/admin/menu/product-manager/CreateProduct';
import CategoryManager from '../modules/admin/menu/category-manager/CategoryManager';
import OrderManager from '../modules/admin/menu/order-manager/OrderManager';
import AdminDashboard from '../modules/admin/menu/dashboard/AdminDashboard';

// Các thành phần người dùng
import TheLayout from '../components/layout/TheLayout';
import HomeUser from '../modules/app/home/HomeUser';
import Login from '../modules/app/auth/Login';
import Register from '../modules/app/auth/Register';
import TheLayoutAuth from '../modules/app/auth/TheLayoutAuth';

import ListProduct from '../modules/app/home/ListProduct';
import ProductDetail from '../modules/app/home/product-detail/ProductDetail';
import Cart from '../modules/app/home/Cart';
import ProfilePage from '../modules/app/home/profile/Profile';
import CheckoutPage from '../modules/app/home/check-out-page/CheckoutPage';
import History from '../modules/app/home/history/History';

// Trang kết quả thanh toán
import PaymentSuccess from '../pages/payment-success/PaymentSuccess';
import PaymentError from '../pages/payment-error/PaymentError';

// Định nghĩa tuyến đường
import {
  DEFINE_ROUTERS_ADMIN,
  DEFINE_USER_ROUTERS,
} from '../constants/route-mapper';

/**
 * Cấu hình định tuyến ứng dụng
 *
 * Định nghĩa tất cả các tuyến đường cho ứng dụng sử dụng createBrowserRouter của React Router
 */
const router = createBrowserRouter([
  // Layout người dùng chính với header và footer
  {
    path: DEFINE_USER_ROUTERS.home,
    errorElement: <ErrorPage />,
    Component: TheLayout, // Thành phần bao bọc với header và footer
    children: [ // Các tuyến đường lồng nhau được hiển thị trong layout chính
      {
        index: true,
        element: <HomeUser />,
      },
      {
        path: DEFINE_USER_ROUTERS.checkoutPage,
        element: <CheckoutPage />,
      },
      {
        path: DEFINE_USER_ROUTERS.orderHistory,
        element: <History />,
      },
      {
        path: DEFINE_USER_ROUTERS.profile,
        element: <ProfilePage />,
      },
      {
        path: DEFINE_USER_ROUTERS.listProduct,
        element: <ListProduct />,
      },
      {
        path: DEFINE_USER_ROUTERS.productDetail,
        element: <ProductDetail />,
      },
      {
        path: DEFINE_USER_ROUTERS.myCart,
        element: <Cart />,
      },
      // {
      //   path: DEFINE_USER_ROUTERS.aboutUs,
      //   element: <AboutUs />,
      // },
      // {
      //   path: DEFINE_USER_ROUTERS.contactUs,
      //   element: <ContactUs />,
      // },
      {
        path: DEFINE_USER_ROUTERS.paymentSuccess,
        element: <PaymentSuccess />,
      },
      {
        path: DEFINE_USER_ROUTERS.paymentError,
        element: <PaymentError />,
      },
    ],
  },
  // Layout xác thực cho trang đăng nhập
  {
    Component: TheLayoutAuth, // Layout dành riêng cho xác thực
    path: DEFINE_USER_ROUTERS.login,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  // Layout xác thực cho trang đăng ký
  {
    Component: TheLayoutAuth, // Layout dành riêng cho xác thực
    path: DEFINE_USER_ROUTERS.register,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
  // Phần quản trị với các tuyến đường được bảo vệ
  {
    path: DEFINE_ROUTERS_ADMIN.homeAdmin,
    errorElement: <ErrorPage />,
    Component: TheLayoutAdmin, // Layout quản trị với thanh bên
    children: [ // Các tuyến đường lồng nhau của quản trị
      {
        index: true,
        element: <AdminPage />,
      },

      {
        path: DEFINE_ROUTERS_ADMIN.productManager,
        element: <ProductsManager />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.dashboard,
        element: <AdminDashboard />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.orderManager,
        element: <OrderManager />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.categoryManager,
        element: <CategoryManager />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.newProduct,
        element: <CreateProduct />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.editProduct,
        element: <EditProduct />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS_ADMIN.loginAdmin,
    element: <LoginAdmin />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;
