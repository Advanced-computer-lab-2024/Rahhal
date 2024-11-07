import { productAxiosInstance } from "@/utils/axios-instances";
import type { TRating } from "@/utils/types";

// Products service calls
export async function getAllProducts() {
  return await productAxiosInstance.get("/products");
}

export async function getAvailableProducts() {
  return await productAxiosInstance.get("/products/available");
}

export async function getProductById(id: string) {
  return await productAxiosInstance.get(`/products/${id}`);
}

export async function createProduct(body: string) {
  return await productAxiosInstance.post("/products", body);
}

export async function updateProduct(id: string, body: string) {
  return await productAxiosInstance.patch(`/products/${id}`, body);
}

export async function deleteProduct(id: string) {
  return await productAxiosInstance.delete(`/products/${id}`);
}

export async function addProductRating(productId: string, rating: TRating) {
  return await productAxiosInstance.post(`/products/${productId}/ratings`, rating);
}

export async function updateProductRating(
  productId: string,
  userId: string,
  rating: Partial<TRating>,
) {
  return await productAxiosInstance.patch(`/products/ratings/${productId}`, { userId, rating });
}
