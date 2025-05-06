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
  TOKEN: 'winmobile_token',
  ADMIN: 'winmobile_admin',
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
 * Lưu token xác thực vào localStorage
 * @param token Token xác thực cần lưu
 */
export const setToken = (token: string | undefined): void => {
  try {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
  } catch (error) {
    console.error('Lỗi khi lưu token vào localStorage:', error);
  }
};

/**
 * Lấy token xác thực từ localStorage
 * @returns Token xác thực hoặc undefined nếu không có
 */
export const getToken = (): string | undefined => {
  try {
    return localStorage.getItem(STORAGE_KEYS.TOKEN) || undefined;
  } catch (error) {
    console.error('Lỗi khi đọc token từ localStorage:', error);
    return undefined;
  }
};

/**
 * Đánh dấu người dùng là admin
 * @param isAdmin true nếu người dùng là admin, false nếu không phải
 */
export const setAdmin = (isAdmin: boolean): void => {
  try {
    if (isAdmin) {
      localStorage.setItem(STORAGE_KEYS.ADMIN, 'admin');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN);
    }
  } catch (error) {
    console.error('Lỗi khi lưu trạng thái admin vào localStorage:', error);
  }
};

/**
 * Kiểm tra người dùng có phải là admin không
 * @returns true nếu người dùng là admin, false nếu không phải
 */
export const isAdmin = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN) === 'admin';
  } catch (error) {
    console.error('Lỗi khi đọc trạng thái admin từ localStorage:', error);
    return false;
  }
};

/**
 * Đăng xuất: xóa tất cả dữ liệu người dùng, giỏ hàng và token
 */
export const logout = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN);
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
