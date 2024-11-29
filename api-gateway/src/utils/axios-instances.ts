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

const exchangeratesAxiosInstance = axios.create({
  baseURL: "https://api.exchangeratesapi.io/v1",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const bookingAxiosInstance = axios.create({
  baseURL: "http://booking:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const orderAxiosInstance = axios.create({
  baseURL: "http://order:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const paymentAxiosInstance = axios.create({
  baseURL: "http://payment:3000",
const authAxiosInstance = axios.create({
  baseURL: "http://authentication:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

export {
  userAxiosInstance,
  entertainmentAxiosInstance,
  productAxiosInstance,
  bookingAxiosInstance,
  exchangeratesAxiosInstance,
  orderAxiosInstance,
  paymentAxiosInstance,
  authAxiosInstance,
};
