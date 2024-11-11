import axios from 'axios';
import { STATUS_CODES } from '@/utils/constants';


const entertainmentAxiosInstance = axios.create({
    baseURL: "http://entertainment:3000",
    validateStatus: (status) => {
      return status < STATUS_CODES.SERVER_ERROR;
    },
  });
  
  const productAxiosInstance = axios.create({
    baseURL: "http://product:3000",
    validateStatus: (status) => {
      return status < STATUS_CODES.SERVER_ERROR;
    },
  });

  const gatewayAxiosInstance = axios.create({
    baseURL: "http://backend:3000/api",
    validateStatus: (status) => {
      return status < STATUS_CODES.SERVER_ERROR;
    },
  });
  
  export { entertainmentAxiosInstance, productAxiosInstance, gatewayAxiosInstance };