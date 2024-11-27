import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as bookingService from "@/services/booking-services/booking-service";

export async function getBookings(req: Request, res: Response) {
  const filter = req.query;
  try {
    const bookings = await bookingService.getBookings(filter);
    res.status(STATUS_CODES.STATUS_OK).json(bookings);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function getBookingById(req: Request, res: Response) {
  const bookingId = req.params.id;
  try {
    const booking = await bookingService.getBookingById(bookingId);
    if (booking) {
      res.status(STATUS_CODES.STATUS_OK).json(booking);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createBooking(req: Request, res: Response) {
  const booking = req.body;
  try {
    const newBooking = await bookingService.createBooking(booking);
    res.status(newBooking.status).json(newBooking.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateBooking(req: Request, res: Response) {
  const bookingId = req.params.id;
  const booking = req.body;
  try {
    const updatedBooking = await bookingService.updateBooking(bookingId, booking);
    res.status(updatedBooking.status).json(updatedBooking.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteBooking(req: Request, res: Response) {
  const bookingId = req.params.id;
  try {
    const deletedBooking = await bookingService.deleteBooking(bookingId);
    res.status(deletedBooking.status).json(deletedBooking.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
