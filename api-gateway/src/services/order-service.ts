import { orderAxiosInstance } from "@/utils/axios-instances";
import type { OrderQueryParams } from "@/utils/types";

export async function getOrders(filter: OrderQueryParams) {
  return orderAxiosInstance.get("/orders", { params: filter });
}
export async function getOrderById(id: string) {
  return orderAxiosInstance.get(`/orders/${id}`);
}
export async function getOrdersByDateRange(filter: string) {
  return orderAxiosInstance.get("/orders/date/date-range", { params: filter });
}
export async function createOrder(body: string) {
  return orderAxiosInstance.post("/orders", body);
}
export async function updateOrder(id: string, body: string) {
  return orderAxiosInstance.patch(`/orders/${id}`, body);
}
export async function rateProduct(id: string, body: string) {
  return orderAxiosInstance.patch(`/orders/rate-product/${id}`, body);
}
export async function deleteOrder(id: string) {
  return orderAxiosInstance.delete(`/orders/${id}`);
}
