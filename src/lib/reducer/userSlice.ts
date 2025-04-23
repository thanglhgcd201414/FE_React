/**
 * Reducer quản lý trạng thái người dùng trong ứng dụng WinMobile
 *
 * Slice này quản lý thông tin người dùng đã đăng nhập, bao gồm
 * thông tin cá nhân, email, và các dữ liệu liên quan đến người dùng
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/user.types';

/**
 * Giao diện trạng thái người dùng
 */
export interface IUserState {
  userData: IUser | undefined; // Dữ liệu người dùng hoặc undefined nếu chưa đăng nhập
}

/**
 * Trạng thái ban đầu của reducer
 */
const initialState: IUserState = {
  userData: undefined // Ban đầu người dùng chưa đăng nhập
};

/**
 * Tạo user slice với reducer và actions
 */
export const userSlice = createSlice({
  name: 'user', // Tên của slice
  initialState,
  reducers: {
    /**
     * Action để cập nhật thông tin người dùng
     * @param state Trạng thái hiện tại
     * @param action Action chứa dữ liệu người dùng mới
     */
    setUser: (state, action: PayloadAction<IUser | undefined>) => {
      state = { ...state, userData: action.payload };
      return state;
    },
  },
});

// Xuất các actions để sử dụng trong các components
export const { setUser } = userSlice.actions;

// Tạo reducer từ slice
const userReducer = userSlice.reducer;

// Xuất reducer để sử dụng trong store
export default userReducer;
