
import axios from "axios";
import { getToken } from "../utils/localStorage";

const axiosRequest = axios.create({
  //đi vào đây để lấy đường dẫn ngay bên dưới 
  baseURL: `http://localhost:8080/api/v1`,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosRequest.interceptors.request.use(config => {
  //đi vào đây để lấy token ngay bên dưới
  //mục đích đính kèn token để gửi cùng với rquest 
  const token = getToken(); 
  // Lấy token từ localStorage thông qua việc import getToken từ localStorage phía trên
  // Sau khi được lây token trở về thì sẽ gán được token vào trên token
  

  
  if (token) 
      // ktr nếu có token 
    //thì sẽ gán vào config.headers.Authorization 
    //với giá trị là Bearer ${token}
  config.headers.Authorization = `Beaer ${token}`;
  //============================ Bearer eazxcvbnm....

  return config;
});

export default axiosRequest;
