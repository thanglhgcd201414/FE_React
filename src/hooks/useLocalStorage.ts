/**
 * Custom hooks để quản lý trạng thái ứng dụng WinMobile sử dụng localStorage
 * 
 * File này cung cấp các hooks thay thế cho Redux hooks, sử dụng localStorage
 * để lưu trữ và quản lý trạng thái
 */
import { useState, useEffect, useCallback } from 'react';
import { ICart } from '../types/cart.types';
import { IUser } from '../types/user.types';
import { 
  getUserData, 
  saveUserData, 
  getCartData, 
  saveCartData, 
  clearAllData,
  clearCartData
} from '../lib/localStorage';

/**
 * Hook quản lý trạng thái người dùng
 * @returns Trạng thái người dùng và các hàm để cập nhật
 */
export const useUser = () => {
  const [userData, setUserDataState] = useState<IUser | undefined>(getUserData());

  // Cập nhật trạng thái người dùng và lưu vào localStorage
  const setUserData = useCallback((data: IUser | undefined) => {
    setUserDataState(data);
    saveUserData(data);
  }, []);

  return {
    userData,
    setUserData,
  };
};

/**
 * Hook quản lý trạng thái giỏ hàng
 * @returns Trạng thái giỏ hàng và các hàm để cập nhật
 */
export const useCart = () => {
  const [cartInfo, setCartInfoState] = useState<ICart | undefined>(getCartData());

  // Cập nhật thông tin giỏ hàng và lưu vào localStorage
  const setCartInfo = useCallback((data: ICart | undefined) => {
    setCartInfoState(data);
    saveCartData(data);
  }, []);

  // Xóa giỏ hàng
  const clearCart = useCallback(() => {
    setCartInfoState(undefined);
    clearCartData();
  }, []);

  // Tính số lượng mục trong giỏ hàng
  const cartItemCount = cartInfo?.items?.length || 0;

  return {
    cartInfo,
    setCartInfo,
    clearCart,
    cartItemCount,
  };
};

/**
 * Hook kết hợp để quản lý cả trạng thái người dùng và giỏ hàng
 * @returns Trạng thái người dùng, giỏ hàng và các hàm để cập nhật
 */
export const useAppState = () => {
  const { userData, setUserData } = useUser();
  const { cartInfo, setCartInfo, clearCart, cartItemCount } = useCart();

  // Đăng xuất: xóa tất cả dữ liệu
  const logout = useCallback(() => {
    setUserData(undefined);
    clearCart();
    clearAllData();
  }, [setUserData, clearCart]);

  return {
    userData,
    setUserData,
    cartInfo,
    setCartInfo,
    clearCart,
    cartItemCount,
    logout,
  };
};
