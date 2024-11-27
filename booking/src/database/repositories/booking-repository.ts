import Booking from "@/database/models/Booking";
import type { bookingStatus, bookingType, IBooking } from "@/utils/types";

export async function getBookings(filter: Partial<IBooking>) {
  return await Booking.find(filter);
}

export async function getBookingById(id: string) {
  return await Booking.findById(id);
}

export async function getBookingByDateRange(
  startDate: Date,
  endDate: Date,
  entity?: string,
  owner?: string,
  type?: bookingType,
  status?: bookingStatus
) {
  const filter: any = {
    selectedDate: { $gte: startDate, $lte: endDate },
  };

  if (entity) {
    filter.entity = entity;
  }

  if (owner) {
    filter.user = owner;
  }

  if (type) {
    filter.type = type;
  }

  if (status) {
    filter.status = status;
  }

  return await Booking.find(filter);
}

export async function createBooking(bookingData: Partial<IBooking>) {
  const newBooking = new Booking(bookingData);
  return await newBooking.save();
}

export async function updateBooking(id: string, bookingData: Partial<IBooking>) {
  return await Booking.findByIdAndUpdate(id, bookingData, { new: true, runValidators: true });
}

export async function deleteBooking(id: string) {
  return await Booking.findByIdAndDelete(id);
}
