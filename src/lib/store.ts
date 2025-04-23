/**
 * Cấu hình Redux store cho ứng dụng WinMobile
 *
 * File này thiết lập Redux store với Redux Persist để lưu trữ trạng thái
 * giữa các phiên làm việc của người dùng (refresh trang, đóng trình duyệt)
 */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducer/userSlice';
import cartReducer from './reducer/cartSlice';

// Cấu hình cho Redux Persist
const persistConfig = {
  key: 'root', // Khóa gốc để lưu trữ
  storage, // Sử dụng localStorage của trình duyệt
};

// Kết hợp các reducer thành một reducer gốc
const rootReducer = combineReducers({
  user: userReducer, // Quản lý trạng thái người dùng
  cart: cartReducer // Quản lý trạng thái giỏ hàng
});

// Áp dụng cấu hình persist vào reducer gốc
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo Redux store với reducer đã được cấu hình persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra serializable vì Redux Persist có thể gây vấn đề
    }),
});

// Tạo persistor để sử dụng với PersistGate
export const persistor = persistStore(store);

// Suy luận các kiểu `IRootState` và `AppDispatch` từ store
export type IRootState = ReturnType<typeof store.getState>;
// Kiểu suy luận: {user: UserState, cart: CartState}
export type AppDispatch = typeof store.dispatch;
