import axiosRequest from "../plugins/request";
import { ICategory } from "../types/category";
import { IBaseResponse, IBaseResponseList } from "../types/response.types";
import onRemoveParams from "../utils/on-remove-params";

class CategoryService {
  public async create(data: Record<string, any>): Promise<IBaseResponse<ICategory>> {
    try {
      const rs = await axiosRequest.post("/category", data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async update(id: string, data: Record<string, any>): Promise<IBaseResponse<ICategory>> {
    try {
      const rs = await axiosRequest.put(`/category/${id}`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async remove(id: string): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.delete(`/category/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async findOne(id: string): Promise<IBaseResponse<ICategory>> {
    try {
      const rs = await axiosRequest.get(`/category/${id}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async findAll(query: Record<string, any>): Promise<IBaseResponse<IBaseResponseList<ICategory[]>>> {
    try {
      const rs = await axiosRequest.get("/category", {
        params: onRemoveParams(query),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CategoryService;