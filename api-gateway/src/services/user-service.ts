import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: "http://user:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

// users service calls
export async function getAllUsers() {
  return await axiosInstance.get("/users");
}

export async function getUserById(id: string) {
  return await axiosInstance.get(`/users/${id}`);
}

export async function createUser(body: string) {
  return await axiosInstance.post("/users", body);
}

export async function updateUser(id: string, body: string) {
  return await axiosInstance.patch(`/users/${id}`, body);
}

export async function deleteUser(id: string) {
  return await axiosInstance.delete(`/users/:${id}`);
}
