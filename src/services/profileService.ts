import axiosRequest from "../plugins/request";
import { IBaseResponse } from "../types/response.types";
import { IUser } from "../types/user.types";

class ProfileService {
  private _prefixURL = "/profile";

  public async updateProfile(data: Record<string, any>): Promise<IBaseResponse<IUser>> {
    try {
      const rs = await axiosRequest.put(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getProfile(): Promise<IBaseResponse<IUser>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ProfileService;