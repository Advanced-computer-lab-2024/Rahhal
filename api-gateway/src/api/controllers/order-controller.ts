import type { Request, Response } from "express";
import * as orderService from "@/services/order-service";
import { STATUS_CODES } from "@/utils/constants";
import { OrderQueryParams } from "@/utils/types";

export async function getOrders(req: Request, res: Response) {
  try {
    const filter: OrderQueryParams = req.query;
    const orders = await orderService.getOrders(filter);
    res.status(orders.status).json(orders.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    const order = await orderService.getOrderById(orderId);
    res.status(order.status).json(order.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getOrdersByDateRange(req: Request, res: Response) {
  try {
    const filter = req.query;
    const orders = await orderService.getOrdersByDateRange(JSON.stringify(filter));
    res.status(orders.status).json(orders.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const orderData = req.body;
    const order = await orderService.createOrder(orderData);
    res.status(order.status).json(order.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    const orderData = req.body;
    const order = await orderService.updateOrder(orderId, orderData);
    res.status(order.status).json(order.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    const orderId = req.params.id;
    const order = await orderService.deleteOrder(orderId);
    res.status(order.status).json(order.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
