import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/not-found';
import AdminPage from '../modules/admin/AdminPage';
import TheLayoutAdmin from '../modules/admin/layout/TheLayoutAdmin';
import {
  DEFINE_ROUTERS_ADMIN,
  DEFINE_USER_ROUTERS,
} from '../constants/route-mapper';
import LoginAdmin from '../modules/admin/auth/LoginAdmin';
import ProductsManager from '../modules/admin/menu/product-manager/ProductsManger';
import EditProduct from '../modules/admin/menu/product-manager/EditProduct';
import TheLayout from '../components/layout/TheLayout';
import HomeUser from '../modules/app/home/HomeUser';
import CreateProduct from '../modules/admin/menu/product-manager/CreateProduct';
import CategoryManager from '../modules/admin/menu/category-manager/CategoryManager';
import Login from '../modules/app/auth/Login';
import Register from '../modules/app/auth/Register';
import TheLayoutAuth from '../modules/app/auth/TheLayoutAuth';
import AboutUs from '../modules/app/home/landing/AboutUs';
import ContactUs from '../modules/app/home/landing/ContactUs';
import ListProduct from '../modules/app/home/ListProduct';
import ProductDetail from '../modules/app/home/product-detail/ProductDetail';
import Cart from '../modules/app/home/Cart';
import ProfilePage from '../modules/app/home/profile/Profile';
import CheckoutPage from '../modules/app/home/check-out-page/CheckoutPage';
import History from '../modules/app/home/history/History';
import OrderManager from '../modules/admin/menu/order-manager/OrderManager';
import AdminDashboard from '../modules/admin/menu/dashboard/AdminDashboard';
import PaymentSuccess from '../pages/payment-success/PaymentSuccess';
import PaymentError from '../pages/payment-error/PaymentError';
import BlogsManager from '../modules/admin/menu/blog-manager/BlogsManager';
import ListBlog from '../modules/app/home/blog/ListBlog';
import BlogDetail from '../modules/app/home/blog/BlogDetail';

const router = createBrowserRouter([
  {
    path: DEFINE_USER_ROUTERS.home,
    errorElement: <ErrorPage />,
    Component: TheLayout,
    children: [
      {
        index: true,
        element: <HomeUser />,
      },
      {
        path: DEFINE_USER_ROUTERS.blogs,
        element: <ListBlog />,
      },
      {
        path: DEFINE_USER_ROUTERS.blogsDetail,
        element: <BlogDetail />,
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
      {
        path: DEFINE_USER_ROUTERS.aboutUs,
        element: <AboutUs />,
      },
      {
        path: DEFINE_USER_ROUTERS.contactUs,
        element: <ContactUs />,
      },
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
  {
    Component: TheLayoutAuth,
    path: DEFINE_USER_ROUTERS.login,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    Component: TheLayoutAuth,
    path: DEFINE_USER_ROUTERS.register,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
  {
    path: DEFINE_ROUTERS_ADMIN.homeAdmin,
    errorElement: <ErrorPage />,
    Component: TheLayoutAdmin,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: DEFINE_ROUTERS_ADMIN.blogsManager,
        element: <BlogsManager />,
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
