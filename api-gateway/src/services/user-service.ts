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

// users service calls
export async function getAllUsers() {
  return await userAxiosInstance.get("/users");
}

export async function getUserById(id: string) {
  return await userAxiosInstance.get(`/users/${id}`);
}

export async function getUserActivities(userId: string) {
  return await entertainmentAxiosInstance.get(`/activities?ownerId=${userId}`);
}

export async function getUserHistoricalPlaces(userId: string) {
  return await entertainmentAxiosInstance.get(`/historical-places?ownerId=${userId}`);
}

export async function getUserProducts(userId: string) {
  return await productAxiosInstance.get(`/products?sellerId=${userId}`);
}

export async function createUser(body: string) {
  return await userAxiosInstance.post("/users", body);
}

export async function updateUser(id: string, body: string) {
  return await userAxiosInstance.patch(`/users/${id}`, body);
}

export async function deleteUser(id: string) {
  return await userAxiosInstance.delete(`/users/:${id}`);
}

export async function loginUser(body: string) {
  return await axiosInstance.post("/users/login", body);
}
