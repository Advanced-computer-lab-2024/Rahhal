import type { IOrder } from "@/database/models/Order";
import * as orderRepository from "@/database/repositories/order-repository";
import type { OrderQueryParams } from "@/utils/types";

// Get all orders
export async function getOrders(filter: OrderQueryParams) {
  return orderRepository.getOrders(filter);
}

// Get order by id
export async function getOrderById(id: string) {
  return orderRepository.getOrderById(id);
}

// Create a new order
export async function createOrder(orderData: IOrder) {
  return orderRepository.createOrder(orderData);
}

// Update an existing order
export async function updateOrder(id: string, orderData: IOrder) {
  return orderRepository.updateOrder(id, orderData);
}

// Delete an order
export async function deleteOrder(id: string) {
  return orderRepository.deleteOrder(id);
}

// Get orders by date range
export async function getOrdersByDateRange(startDate: Date, endDate: Date, productId: string | undefined) {
  if (startDate > endDate) {
    throw new Error("Start date must be before end date");
  }
  return orderRepository.getOrdersByDateRange(startDate, endDate, productId);
}

export async function rateProduct(
  orderId: string,
  productId: string,
  rating: number,
  review: string,
) {
  return orderRepository.rateProduct(orderId, productId, rating, review);
}