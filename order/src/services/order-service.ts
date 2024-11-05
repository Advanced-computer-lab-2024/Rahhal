import type { IOrder, OrderStatus } from "@/database/models/Order";
import * as orderRepository from "@/database/repositories/order-repository";

// Get all orders
export async function getAllOrders() {
  return orderRepository.getAllOrders();
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

// Get orders by user
export async function getOrdersByUser(userId: string) {
  return orderRepository.getOrdersByUser(userId);
}

// Get orders by status
export async function getOrdersByStatus(orderStatus: OrderStatus) {
  return orderRepository.getOrdersByStatus(orderStatus);
}

// Get orders by seller
export async function getOrdersBySeller(seller: string) {
  return orderRepository.getOrdersBySeller(seller);
}

// Get orders by product
export async function getOrdersByProduct(productId: string) {
  return orderRepository.getOrdersByProduct(productId);
}

// Get orders by date range
export async function getOrdersByDateRange(startDate: Date, endDate: Date) {
  if (startDate > endDate) {
    throw new Error("Start date must be before end date");
  }
  return orderRepository.getOrdersByDateRange(startDate, endDate);
}
