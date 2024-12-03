import * as stripeService from "@/services/stripe-service";
import type { Request, Response } from "express";

export async function createPaymentIntent(req: Request, res: Response) {
  const { items } = req.body;
  const paymentIntent = await stripeService.createPaymentIntent(items);
  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
}
