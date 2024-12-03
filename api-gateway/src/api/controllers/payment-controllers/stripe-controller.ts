import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as stripeService from "@/services/payment-services/stripe-service";

export async function createPaymentIntent(req: Request, res: Response) {
  try {
    const items = req.body;
    const paymentIntent = await stripeService.createPaymentIntent(items);
    console.error(paymentIntent.status);
    res.status(paymentIntent.status).json(paymentIntent.data);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
