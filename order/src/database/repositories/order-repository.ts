import Order from "@/database/models/Order";
import type { IOrder } from "@/database/models/Order";
import type { OrderQueryParams } from "@/utils/types";

// Get orders
export async function getOrders(queryParams: OrderQueryParams) {
  const query: any = {};

  // Add conditions to the query object based on provided parameters
  if (queryParams.userId) {
    query.userId = queryParams.userId;
  }
  if (queryParams.orderStatus) {
    query.orderStatus = queryParams.orderStatus;
  }
  if (queryParams.seller) {
    query["items.seller"] = queryParams.seller;
  }
  if (queryParams.productId) {
    query["items.productId"] = queryParams.productId;
  }
  return Order.find(query).exec();
}

// Get order by id
export async function getOrderById(id: string) {
  return Order.findById(id).exec();
}

// Get orders by date range
export async function getOrdersByDateRange(startDate: Date, endDate: Date) {
  return Order.find({ createdAt: { $gte: startDate, $lte: endDate } }).exec();
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

// Rate a product in an order
export async function rateProduct(
  orderId: string,
  productId: string,
  rating: number,
  review: string,
) {
  return Order.updateOne(
    { _id: orderId, "items.productId": productId },
    { $set: { "items.$.rating": { rating, review } } },
  );
}
