import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";

interface Promotion {
  type: "percentage" | "fixed" | "shipping";
  value: number;
  description: string;
  message?: string;
}

export async function applyPromocode(promocode: string, id: string) {
  const response = await axios.post(`${SERVICES_URLS.PAYMENT}/promocode/${id}`, {
    code: promocode,
  });
  return response.data;
}

export async function createPaymentIntent(items: { id: string; amount: number }[]) {
  try {
    const response = await axios.post(SERVICES_URLS.PAYMENT + `/create-payment-intent`, {
      items: items,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
  }
}
