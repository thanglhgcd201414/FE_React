import axiosRequest from "../plugins/request";
import { IProduct } from "../types/product.types";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import onRemoveParams from "../utils/on-remove-params";

class ProductService {
  private _prefixURL = "/products";

  public async create(data: Record<string, any>): Promise<IBaseResponse<IProduct>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async update(id: string, data: Record<string, any>): Promise<IBaseResponse<IProduct>> {
    try {
      const rs = await axiosRequest.put(`${this._prefixURL}/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async remove(id: string): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.delete(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async findOne(id: string): Promise<IBaseResponse<{productDetail: IProduct, relatedProducts: IProduct[]}>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async findAll(query: Record<string, any>): Promise<IBaseResponse<IBaseResponseList<IProduct[]>>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }


}

export default ProductService;