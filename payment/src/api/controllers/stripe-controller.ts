import * as stripeService from "@/services/stripe-service";
import type { Request, Response } from "express";
import { STATUS_CODES, ERROR_MESSAGES } from "@/utils/constants";

export async function createPaymentIntent(req: Request, res: Response) {
  try {
    const { items } = req.body;
    console.log(items);
    const paymentIntent = await stripeService.createPaymentIntent(items);
    res.send({
      clientSecret: paymentIntent.client_secret,
      // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}
