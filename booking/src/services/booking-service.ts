import type { IBooking } from "@/utils/types";
import * as bookingRepository from "@/database/repositories/booking-repository";

export async function getBookings(filter: Partial<IBooking>) {
  return await bookingRepository.getBookings(filter);
}

export async function getBookingById(id: string) {
  return await bookingRepository.getBookingById(id);
}

export async function getBookingByDateRange(startDate: Date, endDate: Date, entity?: string, owner?: string) {
  return await bookingRepository.getBookingByDateRange(startDate, endDate, entity, owner);
}

export async function createBooking(bookingData: Partial<IBooking>) {
  return await bookingRepository.createBooking(bookingData);
}

export async function updateBooking(id: string, bookingData: Partial<IBooking>) {
  return await bookingRepository.updateBooking(id, bookingData);
}

export async function deleteBooking(id: string) {
  return await bookingRepository.deleteBooking(id);
}
