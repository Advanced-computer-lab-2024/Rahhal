import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const userAxiosInstance = axios.create({
  baseURL: process.env.USER_SERVICE_URL || "http://user:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const entertainmentAxiosInstance = axios.create({
  baseURL: process.env.ENTERTAINMENT_SERVICE_URL || "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const productAxiosInstance = axios.create({
  baseURL: process.env.PRODUCT_SERVICE_URL || "http://product:3000",
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
  baseURL: process.env.BOOKING_SERVICE_URL || "http://booking:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const orderAxiosInstance = axios.create({
  baseURL: process.env.ORDER_SERVICE_URL || "http://order:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const paymentAxiosInstance = axios.create({
  baseURL: process.env.PAYMENT_SERVICE_URL || "http://payment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

const authAxiosInstance = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL || "http://authentication:3000",
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
