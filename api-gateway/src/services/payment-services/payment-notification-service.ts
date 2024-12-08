import { paymentAxiosInstance } from "@/utils/axios-instances";

export async function sendReceipt(body: string) {
  return await paymentAxiosInstance.post("/receipt", body);
}
