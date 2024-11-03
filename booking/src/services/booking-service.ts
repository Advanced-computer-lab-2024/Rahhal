import type { bookingType, IBooking } from "@/utils/types";
import * as bookingRepository from "@/database/repositories/booking-repository";

export async function getBookings(filter: Partial<IBooking>) {
  return await bookingRepository.getBookings(filter);
}

export async function getBookingById(id: string) {
  return await bookingRepository.getBookingById(id);
}

export async function createBooking(user: string, entity: string, type: bookingType) {
  return await bookingRepository.createBooking(user, entity, type);
}

export async function updateBooking(id: string, bookingData: Partial<IBooking>) {
  return await bookingRepository.updateBooking(id, bookingData);
}

export async function deleteBooking(id: string) {
  return await bookingRepository.deleteBooking(id);
}
