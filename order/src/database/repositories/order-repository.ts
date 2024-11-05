import Order from "@/database/models/Order";
import type { IOrder, OrderStatus } from "@/database/models/Order";

// Get all orders
export async function getAllOrders() {
  return Order.find().exec();
}

// Get order by id
export async function getOrderById(id: string) {
  return Order.findById(id).exec();
}

// Create a new order
export async function createOrder(orderData: IOrder) {
  const newOrder = new Order(orderData);
  return newOrder.save();
}

// Update an existing order
export async function updateOrder(id: string, orderData: IOrder) {
  return Order.findByIdAndUpdate(id, orderData, {
    new: true,
    runValidators: true,
  });
}

// Delete an order
export async function deleteOrder(id: string) {
  return Order.findByIdAndDelete(id);
}

// Get orders by user
export async function getOrdersByUser(userId: string) {
  return Order.find({ userId: userId }).exec();
}

// Get orders by status
export async function getOrdersByStatus(orderStatus: OrderStatus) {
  return Order.find({ orderStatus: orderStatus }).exec();
}

// Get orders by seller
export async function getOrdersBySeller(seller: string) {
  return Order.find({ "items.seller": seller }).exec();
}

// Get orders by product
export async function getOrdersByProduct(productId: string) {
  return Order.find({ "items.productId": productId }).exec();
}

// Get orders by date range
export async function getOrdersByDateRange(startDate: Date, endDate: Date) {
  return Order.find({ orderDate: { $gte: startDate, $lte: endDate } }).exec();
}
