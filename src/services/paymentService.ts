import axiosRequest from "../plugins/request";
import { IBaseResponse } from "../types/response.types";


class PaymentService {
  public async createPayment(data: Record<string, any>): Promise<IBaseResponse<string>> {
    try {
      const rs = await axiosRequest.post("/payment", data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default PaymentService;