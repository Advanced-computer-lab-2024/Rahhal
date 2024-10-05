import axios from 'axios'
import { STATUS_CODES } from '@/utils/constants'

const axiosInstance = axios.create(
  {
    baseURL: "http://product:3000",
    validateStatus: (status) => {
      return status < STATUS_CODES.GATEWAY_TIMEOUT;
    }
  }
)

// Products service calls
export async function getAllProducts() {
  return await axiosInstance.get("/products");
}

export async function getProductById(id: string) {
  return await axiosInstance.get(`/products/${id}`);
}

export async function createProduct(body: string) {
  return await axiosInstance.post("/products", body);
}

export async function updateProduct(id: string, body: string) {
  return await axiosInstance.patch(`/products/${id}`, body);
}

export async function deleteProduct(id: string) {
  return await axiosInstance.delete(`/products/${id}`);
}
