/**
 * Điểm vào chính cho ứng dụng thương mại điện tử WinMobile
 *
 * File này thiết lập ứng dụng React với các tính năng sau:
 * - localStorage cho quản lý trạng thái đơn giản
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

// Khởi tạo thư viện AOS (Animate On Scroll)
AOS.init();

// Tạo và hiển thị ứng dụng React
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
