import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: process.env.ENTERTAINMENT_SERVICE_URL || "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

// Categories service calls
export async function getAllCategories() {
  return await axiosInstance.get("/categories");
}

export async function getCategoryById(id: string) {
  return await axiosInstance.get(`/categories/${id}`);
}

export async function createCategory(body: string) {
  return await axiosInstance.post("/categories", body);
}

export async function updateCategory(id: string, body: string) {
  return await axiosInstance.patch(`/categories/${id}`, body);
}

export async function deleteCategory(id: string) {
  return await axiosInstance.delete(`/categories/${id}`);
}
