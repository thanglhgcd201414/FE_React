import { EOrderStatus } from "../constants/order-status";
import axiosRequest from "../plugins/request";
import { IOrder } from "../types/order.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import onRemoveParams from "../utils/on-remove-params";

class OrderService {
  /**
   * Tạo đơn hàng mới
   * @param data Dữ liệu đơn hàng (items, paymentMethod, paymentStatus)
   * @returns Thông tin đơn hàng đã tạo
   */
  public async create(data: Record<string, any>): Promise<IBaseResponse<IOrder>> {
    try {
      const rs = await axiosRequest.post("/order", data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateOrderStatus(id: string, data: {orderStatus: EOrderStatus}): Promise<IBaseResponse<IOrder>> {
    try {
      const rs = await axiosRequest.put(`/order/order-status/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async findOne(id: string): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.get(`/order/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async findAll(query: Record<string, any>): Promise<IBaseResponse<IBaseResponseList<IOrder[]>>> {
    try {
      const rs = await axiosRequest.get("/order", {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Đã loại bỏ phương thức cancelOrder vì không hỗ trợ hủy đơn hàng PayPal
}

export default OrderService;