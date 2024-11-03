import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as transportationService from "@/services/transportation-service";
import type { TransferRequest } from "@/interfaces/transferRequest";

export async function getTransportationOffers(req: Request, res: Response) {
  try {
    const transportationOffers = await transportationService.getTransportationOffers(
      req.body as TransferRequest,
    );
    res.status(STATUS_CODES.STATUS_OK).json(transportationOffers);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function getAirportCodes(req: Request, res: Response) {
  try {
    const airportCodes = await transportationService.getAirportCodes(
      Number(req.query.longitude),
      Number(req.query.latitude),
    );
    res.status(STATUS_CODES.STATUS_OK).json(airportCodes);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
