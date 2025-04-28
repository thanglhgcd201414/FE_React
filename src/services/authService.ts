import axiosRequest from "../plugins/request";
import { ILogin, IRegister, IResponseLogin } from "../types/auth.tyes";
import { IBaseResponse } from "../types/response.types";

class AuthService {
  public async login(data: ILogin): Promise<IBaseResponse<IResponseLogin>> {
    try {
      const rs = await axiosRequest.post("/auth/login", data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async register(data: IRegister): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.post("/auth/register", data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const authService = new AuthService();

export default authService;
