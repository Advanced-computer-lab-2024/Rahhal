import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export function createPaymentIntent(items: { amount: number }[]) {
  const amount = calculateOrderAmount(items);

  // Create a PaymentIntent with the order amount and currency
  return stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });
  // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
}

const calculateOrderAmount = (items: { amount: number }[]): number => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};
