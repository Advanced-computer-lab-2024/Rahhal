import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as exchangeRatesService from "@/services/exchange-rates-service";

export async function getLatestExchangeRates(req: Request, res: Response) {
  try {
    const rates = await exchangeRatesService.getLatestExchangeRates();
    res.status(STATUS_CODES.STATUS_OK).json(rates);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
