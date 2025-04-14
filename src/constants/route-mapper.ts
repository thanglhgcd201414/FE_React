const DEFINE_ROUTERS_ADMIN = {
  homeAdmin: '/admin',
  dashboard: '/admin/dashboard',
  productManager: '/admin/product-manager',
  editProduct: '/admin/product-manager/:id',
  newProduct: '/admin/product-manager/new-product',
  categoryManager: '/admin/category-manager',
  orderManager: '/admin/order-manager',
  blogsManager: '/admin/blogs-manager',
  loginAdmin: '/login-admin',
};

const DEFINE_USER_ROUTERS = {
  home: '/',
  login: '/login',
  register: '/register',
  aboutUs: '/about-us',
  contactUs: '/contact-us',
  listProduct: '/list-product',
  productDetail: '/product-detail/:id',
  myCart: '/my-cart',
  checkoutPage: '/checkout-page',
  orderHistory: '/order-history',
  profile: '/profile',
  blogs: '/blogs',
  blogsDetail: '/blogs/:slug',
  paymentSuccess: '/payment-success/:id',
  paymentError: '/payment-error/:id',
};

export { DEFINE_ROUTERS_ADMIN, DEFINE_USER_ROUTERS };
