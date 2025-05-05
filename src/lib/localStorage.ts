/**
 * Tiện ích quản lý trạng thái ứng dụng WinMobile sử dụng localStorage
 * 
 * File này cung cấp các hàm tiện ích để lưu trữ và truy xuất dữ liệu
 * từ localStorage, thay thế cho Redux
 */
import { ICart } from "../types/cart.types";
import { IUser } from "../types/user.types";

// Các khóa localStorage
const STORAGE_KEYS = {
  USER: 'winmobile_user',
  CART: 'winmobile_cart',
};

/**
 * Lưu dữ liệu người dùng vào localStorage
 * @param userData Dữ liệu người dùng cần lưu
 */
export const saveUserData = (userData: IUser | undefined): void => {
  if (userData) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

/**
 * Lấy dữ liệu người dùng từ localStorage
 * @returns Dữ liệu người dùng hoặc undefined nếu không có
 */
export const getUserData = (): IUser | undefined => {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : undefined;
};

/**
 * Lưu thông tin giỏ hàng vào localStorage
 * @param cartData Thông tin giỏ hàng cần lưu
 */
export const saveCartData = (cartData: ICart | undefined): void => {
  if (cartData) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartData));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CART);
  }
};

/**
 * Lấy thông tin giỏ hàng từ localStorage
 * @returns Thông tin giỏ hàng hoặc undefined nếu không có
 */
export const getCartData = (): ICart | undefined => {
  const cartData = localStorage.getItem(STORAGE_KEYS.CART);
  return cartData ? JSON.parse(cartData) : undefined;
};

/**
 * Xóa tất cả dữ liệu người dùng và giỏ hàng khỏi localStorage
 */
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.CART);
};

/**
 * Xóa dữ liệu giỏ hàng khỏi localStorage
 */
export const clearCartData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CART);
};
