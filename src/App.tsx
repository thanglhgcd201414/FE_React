/**
 * Thành phần ứng dụng chính cho nền tảng thương mại điện tử WinMobile
 *
 * Đây là thành phần gốc thiết lập router provider
 * và đóng vai trò là điểm vào cho ứng dụng.
 * Ứng dụng sử dụng React Router để điều hướng giữa các trang khác nhau.
 */
import { RouterProvider } from "react-router-dom";
import router from "./routers";

/**
 * Thành phần App
 *
 * Hiển thị RouterProvider với các tuyến đường được cấu hình
 * từ cấu hình router
 */
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
