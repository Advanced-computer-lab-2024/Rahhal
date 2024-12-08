import { paymentAxiosInstance } from "@/utils/axios-instances";

export async function createPaymentIntent(body: string) {
  return await paymentAxiosInstance.post("/stripe/create-payment-intent", body);
}
