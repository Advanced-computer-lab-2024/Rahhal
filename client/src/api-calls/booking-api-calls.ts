import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type {
  TBookingType,
  IBooking,
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

export async function createBooking(bookingData: TBookingType) {
  const newBooking = {
    user: bookingData.user,
    entity: bookingData.entity,
    type: bookingData.type,
  };
  const response = await axios.post(SERVICES_URLS.BOOKING + `/bookings`, newBooking);
  return response.data;
}

export async function updateBookingRequest(id: string, bookingData: Partial<IBooking>) {
  const response = await axios.patch(`${SERVICES_URLS.BOOKING}/bookings/${id}`, bookingData);
  return response.data;
}
