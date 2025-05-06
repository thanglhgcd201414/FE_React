import axiosRequest from "../plugins/request";
import { ILogin, IRegister, IResponseLogin } from "../types/auth.tyes";
import { IBaseResponse } from "../types/response.types";

class AuthService {
  //         Giá trị data  ở bên dưới này là values từ form
  public async login(data: ILogin): Promise<IBaseResponse<IResponseLogin>> {
    try {
      // đi vào axiosrequest trước để lấy .... xong đi tiếp ở đây qua BE
      const rs = await axiosRequest.post("/auth/login", data);
      // bên trên tạo 1 biến đối tượng để bắt kết quả từ BE sau khi xử lý xong ( là rs : tên đối tượng này có thể đổi )
      return Promise.resolve(rs.data);
      // dòng trên lấy ra kết quả từ BE cụ thể là rs.data có nghĩa data này trong đối tượng rs
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
