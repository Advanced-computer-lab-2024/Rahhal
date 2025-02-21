import axios from 'axios';
import { STATUS_CODES } from '@/utils/constants';


const entertainmentAxiosInstance = axios.create({
    baseURL: process.env.ENTERTAINMENT_SERVICE_URL || "http://entertainment:3000",
    validateStatus: (status) => {
      return status < STATUS_CODES.SERVER_ERROR;
    },
  });
  
  const productAxiosInstance = axios.create({
    baseURL: process.env.PRODUCT_SERVICE_URL || "http://product:3000",
    validateStatus: (status) => {
      return status < STATUS_CODES.SERVER_ERROR;
    },
  });

  const gatewayAxiosInstance = axios.create({
    baseURL: `${process.env.GATEWAY_SERVICE_URL || "http://backend:3000"}/api`,
    validateStatus: (status) => {
      return status < STATUS_CODES.SERVER_ERROR;
    },
  });
  
  export { entertainmentAxiosInstance, productAxiosInstance, gatewayAxiosInstance };