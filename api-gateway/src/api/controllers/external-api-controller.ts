import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as externalAPIService from "@/services/external-api-service";

export async function getGoBusAPI(req: Request, res: Response) {
    const arrivalDate = req.query.arrivalDate;
    const departureDate = req.query.departureDate;
    const passengersNo = req.query.passengersNo;
    const tripType = 'oneWay';
    const arrivalStations = req.query.arrivalStations;
    const departureStations = req.query.departureStations;
    try {
        const trips = await externalAPIService.getGoBusAPI(arrivalDate as string, departureDate as string, passengersNo as string, tripType, arrivalStations as string, departureStations as string);
        res.status(STATUS_CODES.STATUS_OK).json(trips);
      } catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
      }

}