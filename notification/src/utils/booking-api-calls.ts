import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";
import { IBooking, INotifyRequest } from "./types";

const bookingAxiosInstance = axios.create({
  baseURL: process.env.BOOKING_SERVICE_URL || "http://booking:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

export async function getBookings(entityId: string): Promise<IBooking[]> {
  const bookings = await bookingAxiosInstance.get("/bookings", { params: {entity: entityId} });
  return bookings.data;
}

export async function getNotifyRequests(entityId: string): Promise<INotifyRequest[]> {
  const notifyRequests = await bookingAxiosInstance.get("/notify-requests", { params: {entity: entityId} });
  return notifyRequests.data;
}
