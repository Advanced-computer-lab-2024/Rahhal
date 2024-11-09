import { bookingAxiosInstance } from "@/utils/axios-instances";
import { populateBooking, populateBookings } from "@/utils/booking-populator";

import type { IQueryParamsFilter } from "@/utils/types";

export async function getBookings(filter: Partial<IQueryParamsFilter>) {
  try {
    let owner = "";
    if (filter.owner) {
      owner = filter.owner;
      delete filter.owner;
    }
    const bookings = await bookingAxiosInstance.get("/bookings", { params: filter });
    return populateBookings(bookings.data, filter, owner);
  } catch (error) {
    return new Error("Failed to fetch bookings from booking server\n" + error);
  }
}

export async function getBookingById(id: string) {

  try {
    const booking = await bookingAxiosInstance.get(`/bookings/${id}`);
    return populateBooking(booking.data);

  } catch (error) {
    return new Error("Failed to fetch booking from booking server\n" + error);
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
