import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";

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
