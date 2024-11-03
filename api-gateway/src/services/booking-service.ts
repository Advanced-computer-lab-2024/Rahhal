import { bookingAxiosInstance } from "@/utils/axios-instances";
import { populateBookings } from "@/utils/booking-populator";

import type { IBooking } from "@/utils/types";

export async function getBookings(filter: Partial<IBooking>) {
  try {
    const bookings = await bookingAxiosInstance.get("/bookings", { params: filter });
    return populateBookings(bookings.data, filter);
  } catch (error) {
    return new Error("Failed to fetch bookings from booking server\n" + error);
  }
}

export async function createBooking(body: string) {
  return bookingAxiosInstance.post("/bookings", body);
}

export async function updateBooking(id: string, body: string) {
  return bookingAxiosInstance.patch(`/bookings/${id}`, body);
}

export async function deleteBooking(id: string) {
  return bookingAxiosInstance.delete(`/bookings/${id}`);
}
