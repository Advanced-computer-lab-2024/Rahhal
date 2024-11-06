import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as flightSearchService from "@/services/flights-search-service";
import type { FlightSearchRequest } from "@/interfaces/flight-search-request";

export async function getFlightOffers(req: Request, res: Response) {
  try {
    const flightOffers = await flightSearchService.getFlightOffers(
      req.body as FlightSearchRequest,
    );
    res.status(STATUS_CODES.STATUS_OK).json(flightOffers);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
