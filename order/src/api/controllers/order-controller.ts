import type { Request, Response } from "express";
import * as orderService from "@/services/order-service";
import { STATUS_CODES } from "@/utils/constants";
import { OrderStatus } from "@/database/models/Order";
import { z } from "zod";
import { OrderQueryParams } from "@/utils/types";

export async function getOrders(req: Request, res: Response) {
  try {
    const queryParametersSchema = z.object({
      userId : z.string().optional(),
      orderStatus: z.nativeEnum(OrderStatus).optional(),
      seller: z.string().optional(),
      productId: z.string().optional()
    });

    const validationResult = queryParametersSchema.safeParse(req.query);

    if (!validationResult.success) {
      res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({ error: validationResult.error });
      return;
    }

    const filter = validationResult.data;
    const orders = await orderService.getOrders(filter);
    res.status(STATUS_CODES.STATUS_OK).json(orders);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Order not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(order);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(STATUS_CODES.CREATED).json(order);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    if (!order) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Order not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(order);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    if (!order) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Order not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(order);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function getOrdersByDateRange(req: Request, res: Response) {

  try {
    const queryParametersSchema = z.object({
      startDate: z.string(),
      endDate: z.string(),
    });

    const validationResult = queryParametersSchema.safeParse(req.query);

    if (!validationResult.success) {
      res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).json({ error: validationResult.error });
      return;
    }

    const { startDate, endDate } = validationResult.data;

    const orders = await orderService.getOrdersByDateRange(new Date(startDate), new Date(endDate));
    res.status(STATUS_CODES.STATUS_OK).json(orders);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}