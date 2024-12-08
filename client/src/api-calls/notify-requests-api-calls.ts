import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import { INotifyRequest } from "@/features/home/types/home-page-types";

export async function createNotifyRequest(notifyRequestData: INotifyRequest) {
  try {
    const response = await axios.post(`${SERVICES_URLS.BOOKING}/notify-requests`, notifyRequestData);
    return response.data;
  } catch (error) {
    console.error("Error creating notify request:", error);
  }
}
