import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type {
  TBookingType,
  TPopulatedBooking,
} from "@/features/home/types/home-page-types";

export async function fetchAllBookings() {
  const response = await axios.get(SERVICES_URLS.BOOKING + `/bookings`);
  return response.data;
}

export async function fetchUserBookings(userId: string): Promise<TPopulatedBooking[]> {
  const response = await axios.get(SERVICES_URLS.BOOKING + `/bookings`, {
    params: {
      userId: userId,
    },
  });
  return response.data as TPopulatedBooking[];
}

export async function fetchBookingById(bookingId: string): Promise<TPopulatedBooking> {
  const response = await axios.get(SERVICES_URLS.BOOKING + `/bookings/${bookingId}`);
  return response.data as TPopulatedBooking;
}

export async function createBooking(bookingData: TBookingType) {
  try {
    const response = await axios.post(SERVICES_URLS.BOOKING + `/bookings`, bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
  }
}

export async function updateBookingRequest(id: string, bookingData: Partial<TBookingType>) {
  const response = await axios.patch(`${SERVICES_URLS.BOOKING}/bookings/${id}`, bookingData);
  return response.data;
}
