import axiosRequest from "../plugins/request";
import { IBaseResponse } from "../types/response.types";

class UploadService {
  public async deleteImages(data: string[]): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.post(`/uploads/delete-images`, {
        urls: data,
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async uploadImage(data: any): Promise<IBaseResponse<string>> {
    try {
      const rs = await axiosRequest.post(
        `/uploads/upload-single`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default UploadService;
