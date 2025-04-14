import axiosRequest from "../plugins/request";
import { IResponseByBot } from "../types/chat";
import { IBaseResponse } from "../types/response.types";

class ChatService {
  private _prefixURL = "/chatbot";

  public async chat(data: {message: string}): Promise<IBaseResponse<IResponseByBot>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ChatService;