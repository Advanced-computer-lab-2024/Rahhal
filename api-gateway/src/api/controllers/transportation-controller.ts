import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as transportationService from "@/services/transportation";
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
