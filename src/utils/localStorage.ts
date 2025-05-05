/**
 * Các hàm tiện ích để quản lý trạng thái ứng dụng WinMobile sử dụng localStorage
 * 
 * File này cung cấp các hàm để thao tác trực tiếp với localStorage thay vì sử dụng Redux
 */
import { ICart } from '../types/cart.types';
import { IUser } from '../types/user.types';

// Các khóa localStorage
const STORAGE_KEYS = {
  USER: 'winmobile_user',
  CART: 'winmobile_cart',
};

/**
 * Lấy dữ liệu người dùng từ localStorage
 * @returns Dữ liệu người dùng hoặc undefined nếu không có
 */
export const getUserData = (): IUser | undefined => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : undefined;
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu người dùng từ localStorage:', error);
    return undefined;
  }
};

/**
 * Lưu dữ liệu người dùng vào localStorage
 * @param userData Dữ liệu người dùng cần lưu
 */
export const setUserData = (userData: IUser | undefined): void => {
  try {
    if (userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu người dùng vào localStorage:', error);
  }
};

/**
 * Lấy thông tin giỏ hàng từ localStorage
 * @returns Thông tin giỏ hàng hoặc undefined nếu không có
 */
export const getCartData = (): ICart | undefined => {
  try {
    const cartData = localStorage.getItem(STORAGE_KEYS.CART);
    return cartData ? JSON.parse(cartData) : undefined;
  } catch (error) {
    console.error('Lỗi khi đọc dữ liệu giỏ hàng từ localStorage:', error);
    return undefined;
  }
};

/**
 * Lưu thông tin giỏ hàng vào localStorage
 * @param cartData Thông tin giỏ hàng cần lưu
 */
export const setCartData = (cartData: ICart | undefined): void => {
  try {
    if (cartData) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartData));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CART);
    }
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu giỏ hàng vào localStorage:', error);
  }
};

/**
 * Xóa giỏ hàng khỏi localStorage
 */
export const clearCart = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CART);
  } catch (error) {
    console.error('Lỗi khi xóa giỏ hàng từ localStorage:', error);
  }
};

/**
 * Đăng xuất: xóa tất cả dữ liệu người dùng và giỏ hàng
 */
export const logout = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.CART);
  } catch (error) {
    console.error('Lỗi khi đăng xuất và xóa dữ liệu từ localStorage:', error);
  }
};

/**
 * Lấy số lượng sản phẩm trong giỏ hàng
 * @returns Số lượng sản phẩm trong giỏ hàng
 */
export const getCartItemCount = (): number => {
  const cart = getCartData();
  return cart?.items?.length || 0;
};
