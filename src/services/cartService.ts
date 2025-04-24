import axiosRequest from "../plugins/request";
import { ICart } from "../types/cart.types";
import { IBaseResponse,  } from "../types/response.types";
class CartService {
  private _prefixURL = "/cart";

  /**
   * Thêm sản phẩm vào giỏ hàng
   * @param id ID của giỏ hàng
   * @param data Dữ liệu sản phẩm (productId, quantity)
   * @returns Thông tin giỏ hàng đã cập nhật
   */
  public async addItemToCart(id: string, data: Record<string, any>): Promise<IBaseResponse<ICart>> {
    try {
      const rs = await axiosRequest.post(`${this._prefixURL}/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async update(id: string, data: Record<string, any>): Promise<IBaseResponse<ICart>> {
    try {
      const rs = await axiosRequest.put(`${this._prefixURL}/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async find(): Promise<IBaseResponse<ICart>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CartService;