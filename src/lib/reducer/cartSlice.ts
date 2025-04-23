/**
 * Reducer quản lý trạng thái giỏ hàng trong ứng dụng WinMobile
 *
 * Slice này quản lý thông tin giỏ hàng của người dùng, bao gồm
 * danh sách sản phẩm, số lượng và các thông tin liên quan
 */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { ICart } from '../../types/cart.types';

/**
 * Giao diện trạng thái giỏ hàng
 */
interface CartState {
  cartInfo: ICart | undefined; // Thông tin giỏ hàng hoặc undefined nếu chưa có giỏ hàng
}

/**
 * Trạng thái ban đầu của reducer
 */
const initialState: CartState = {
  cartInfo: undefined // Ban đầu giỏ hàng trống
};

/**
 * Tạo cart slice với reducer và actions
 */
const cartSlice = createSlice({
  name: 'cart', // Tên của slice
  initialState,
  reducers: {
    /**
     * Xóa giỏ hàng
     */
    clearCart: (state) => {
      state.cartInfo = undefined;
    },
    /**
     * Thêm hoặc cập nhật thông tin giỏ hàng
     */
    addCartInfo: (state, action: PayloadAction<ICart>) => {
      state.cartInfo = action.payload;
    }
  },
});

/**
 * Selector để lấy danh sách các mục trong giỏ hàng
 */
export const selectCartItems = (state: { cart: CartState }) => {
  if(state.cart.cartInfo?._id) {
    return state.cart.cartInfo.items;
  }
};

/**
 * Selector để lấy số lượng mục trong giỏ hàng
 * Sử dụng createSelector để tối ưu hiệu suất
 */
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items?.length,
);

// Xuất các actions để sử dụng trong các components
export const { clearCart, addCartInfo } =
  cartSlice.actions;

// Tạo reducer từ slice
const cartReducer = cartSlice.reducer;

// Xuất reducer để sử dụng trong store
export default cartReducer;
