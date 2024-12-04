import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";
import { IActivity, IItinerary } from "./types";

const entertainmentAxiosInstance = axios.create({
  baseURL: "http://entertainment:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

export async function getActivity(entityId: string): Promise<IActivity> {
  const entertainment = await entertainmentAxiosInstance.get(`/activities/${entityId}`);
  return entertainment.data;
}

export async function getItinerary(entityId: string): Promise<IItinerary> {
  const entertainment = await entertainmentAxiosInstance.get(`/itineraries/${entityId}`);
  return entertainment.data;
}
