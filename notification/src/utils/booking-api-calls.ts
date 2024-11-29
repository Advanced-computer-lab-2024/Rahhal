import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";
import { IBooking } from "./types";

const bookingAxiosInstance = axios.create({
  baseURL: "http://booking:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

export async function getBookings(entityId: string): Promise<IBooking[]> {
  const bookings = await bookingAxiosInstance.get("/bookings", { params: {entity: entityId} });
  return bookings.data;
}
