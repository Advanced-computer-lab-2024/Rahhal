import axios from "axios";
import { CONSTANTS } from "./constants";
import type { PopulatedBooking } from "@/utils/types";

export const bookingAxiosInstance = axios.create({
  baseURL: "http://booking:3000",
});

export async function hasBookings(id: string, type: string) {
  try {
    const response = await bookingAxiosInstance.get(`/bookings`, {
      params: { entity: id, type: type, status: "upcoming" },
    });

    const filteredResponse = response.data.filter(
      (booking: PopulatedBooking) => new Date(booking.selectedDate as Date) > new Date(),
    );
    if (filteredResponse.data.length > CONSTANTS.ZERO) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
