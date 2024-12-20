import type { Request, Response } from "express";
import type { bookingType, IBooking, bookingStatus } from "@/utils/types";
import { STATUS_CODES, ERROR_MESSAGES } from "@/utils/constants";
import * as bookingService from "@/services/booking-service";
import { z } from "zod";

export async function getBookings(req: Request, res: Response) {
  try {
    const filters: Partial<IBooking> = {
      user: req.query.userId as string,
      entity: req.query.entity as string,
      type: req.query.type as bookingType,
      status: req.query.status as bookingStatus,
    };
    const definedFilters = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filters).filter(([_, value]) => value !== undefined),
    );

    const bookings = await bookingService.getBookings(definedFilters);
    res.status(STATUS_CODES.STATUS_OK).json(bookings);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function getBookingById(req: Request, res: Response) {
  try {
    
    const id = req.params.id;
    const booking = await bookingService.getBookingById(id);
    if (booking) {
      res.status(STATUS_CODES.STATUS_OK).json(booking);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}


export async function getBookingByDateRange(req: Request, res: Response) {
  try {
    
    
    const queryParametersSchema = z.object({
      startDate: z.string(),
      endDate: z.string(),
      entity: z.string().optional(),
      owner: z.string().optional(),
      type: z.string().optional() as bookingType,
      status: z.string().optional() as bookingStatus,
    });

    const validationResult = queryParametersSchema.safeParse(req.query);

    if (!validationResult.success) {
      return res.status(STATUS_CODES.BAD_REQUEST).json(validationResult.error);
    }

    const { startDate, endDate, entity, owner, type, status } = validationResult.data;

    
   
    const bookings = await bookingService.getBookingByDateRange(
      new Date(startDate),
      new Date(endDate),
      entity,
      owner,
      type,
      status
    );
    res.status(STATUS_CODES.STATUS_OK).json(bookings);


  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }

    
}

export async function createBooking(req: Request, res: Response) {
  try {
    const bookingData: Partial<IBooking> = req.body;
    const booking = await bookingService.createBooking(
      bookingData
    );
    res.status(STATUS_CODES.CREATED).json(booking);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function updateBooking(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const bookingData: Partial<IBooking> = req.body;
    const booking = await bookingService.updateBooking(id, bookingData);
    if (booking) {
      res.status(STATUS_CODES.STATUS_OK).json(booking);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}

export async function deleteBooking(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const booking = await bookingService.deleteBooking(id);
    if (booking) {
      res.status(STATUS_CODES.STATUS_OK).json(booking);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: ERROR_MESSAGES.NOT_FOUND });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : ERROR_MESSAGES.SERVER_ERROR,
    });
  }
}
