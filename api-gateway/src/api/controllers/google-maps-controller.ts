import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as googleMapsService from "@/services/google-maps-service";

export async function getPlaceAutocomplete(req: Request, res: Response) {
  const place = req.query.input;
  const filter = req.query.filter ? req.query.filter : "";
  try {
    const predictions = await googleMapsService.getPlaceAutocomplete(
      place as string,
      filter as string,
    );
    res.status(STATUS_CODES.STATUS_OK).json(predictions);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function getPlaceDetailsById(req: Request, res: Response) {
  const placeId = req.query.placeId;
  try {
    const placeDetails = await googleMapsService.getPlaceDetailsById(placeId as string);
    res.status(STATUS_CODES.STATUS_OK).json(placeDetails);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function getPlaceDetailsByLocation(req: Request, res: Response) {
  const longitude = req.query.longitude as unknown;
  const latitude = req.query.latitude as unknown;
  try {
    const placeDetails = await googleMapsService.getPlaceDetailsByLocation({
      lat: latitude as number,
      lng: longitude as number,
    });
    res.status(STATUS_CODES.STATUS_OK).json(placeDetails);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
