import axiosRequest from "../plugins/request";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import { IReview } from "../types/review";
import onRemoveParams from "../utils/on-remove-params";

class ReviewService {
  private _prefixURL = "/review";

  public async create(data: {
    orderId: string;
    data: {
      productId: string;
      rating: number;
      comment?: string;
    }[];
  }): Promise<IBaseResponse<IReview>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async findAll(productId: string, query: Record<string, any>): Promise<IBaseResponse<IBaseResponseList<IReview[]>>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/${productId}`, {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ReviewService;