/**
 * Điểm vào chính cho ứng dụng thương mại điện tử WinMobile
 *
 * File này thiết lập ứng dụng React với các tính năng sau:
 * - Redux cho quản lý trạng thái với tính năng lưu trữ
 * - AOS (Animate On Scroll) cho hiệu ứng cuộn
 * - StrictMode để làm nổi bật các vấn đề tiềm ẩn
 * - Các thành phần Ant Design
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./stylesheet/index.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import { persistor, store } from "./lib/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";

// Khởi tạo thư viện AOS (Animate On Scroll)
AOS.init();

// Tạo và hiển thị ứng dụng React
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Redux Provider cho quản lý trạng thái */}
    <Provider store={store}>
      {/* PersistGate trì hoãn việc hiển thị cho đến khi trạng thái được lưu trữ được lấy ra */}
      <PersistGate loading={<Spin />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
