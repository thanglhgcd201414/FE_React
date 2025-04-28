/**
 * Module cấu hình và quản lý các yêu cầu HTTP cho ứng dụng WinMobile
 *
 * File này thiết lập cấu hình Axios để gọi API, bao gồm:
 * - Cấu hình URL cơ sở và tiền tố
 * - Xử lý token xác thực
 * - Xử lý lỗi và phản hồi
 * - Cấu hình interceptors cho request và response
 */
import axios, { AxiosResponse } from "axios";
import cookiesStore from "./cookiesStore";
import showError from "../utils/showError";

export const API_URL: string | undefined = import.meta.env.VITE_BASE_URL;

const axiosRequest = axios.create({
  baseURL: `http://localhost:8080/api/v1`, // URL đầy đủ cho API
  // baseURL: `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_BASE_PREFIX}`, // URL đầy đủ cho API
  withCredentials: false, // Không gửi cookie trong các yêu cầu cross-origin
});

// Lấy token xác thực từ cookie
const token = cookiesStore.get("access_token");

// Cấu hình headers mặc định cho các yêu cầu
axiosRequest.defaults.headers.put["Content-Type"] = "application/json"; // Đặt Content-Type cho các yêu cầu PUT

// Thêm token xác thực vào header Authorization nếu có
axiosRequest.defaults.headers.common["Authorization"] = cookiesStore.get(
  "access_token"
)
  ? "Bearer " + token
  : "";

/**
 * Xử lý phản hồi thành công
 * @param value Phản hồi từ server
 * @returns Phản hồi gốc không thay đổi
 */
const onFulFillResponse = (
  value: AxiosResponse<any, any>
): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
  return value;
};

/**
 * Xử lý lỗi từ phản hồi
 * @param error Đối tượng lỗi
 * @returns Promise bị từ chối với lỗi
 */
const onRejectResponse = (error: any) => {
  // Nếu có phản hồi từ server
  if (error.response) {
    const { data, status } = error.response;

    // Xử lý lỗi xác thực (401 hoặc 403)
    if (status === 401 || status === 403) {
      cookiesStore.remove("access_token"); // Xóa token
      axiosRequest.defaults.headers.common["Authorization"] = ""; // Xóa header Authorization
    }

    // Nếu là lỗi server (500+) hoặc không có phản hồi
    if (!error.response || error.response.status >= 500) {
      return Promise.reject(error);
    }

    // Hiển thị lỗi cho người dùng
    showError(data);
  }

  return Promise.reject(error);
};

// Thêm interceptor cho response để xử lý phản hồi và lỗi
axiosRequest.interceptors.response.use(onFulFillResponse, onRejectResponse);

// Thêm interceptor cho request để đảm bảo token được gửi trong mỗi yêu cầu
axiosRequest.interceptors.request.use((config) => {
  const token = cookiesStore.get("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Thêm token vào header Authorization
  }
  return config;
});

// Xuất instance Axios đã được cấu hình để sử dụng trong toàn bộ ứng dụng
export default axiosRequest;
