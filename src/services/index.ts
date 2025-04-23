import CartService from './cartService';
import CategoryService from './categoryService';
import UploadService from './imagesService';
import OrderService from './orderService';
import PaymentService from './paymentService';
import ProductService from './productService';
import ProfileService from './profileService';
import ReviewService from './reviewService';

export const productService = new ProductService();
export const categoryService = new CategoryService();
export const uploadService = new UploadService();
export const cartService = new CartService();
export const reviewService = new ReviewService();
export const profileService = new ProfileService();
export const orderService = new OrderService();
export const paymentService = new PaymentService();
