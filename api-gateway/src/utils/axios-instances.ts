import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const userAxiosInstance = axios.create({
  baseURL: "http://user:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const entertainmentAxiosInstance = axios.create({
  baseURL: "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const productAxiosInstance = axios.create({
  baseURL: "http://product:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

export { userAxiosInstance, entertainmentAxiosInstance, productAxiosInstance };