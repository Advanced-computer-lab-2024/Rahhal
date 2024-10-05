import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as googleMapsService from "@/services/google-maps-service";

export async function getPlaceAutocomplete(req: Request, res: Response) {
  const place = req.query.input;
  try {
    const predictions = await googleMapsService.getPlaceAutocomplete(place as string);
    res.status(STATUS_CODES.STATUS_OK).json(predictions);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}

export async function getPlaceDetails(req: Request, res: Response) {
  const placeId = req.query.placeId;
  try {
    const placeDetails = await googleMapsService.getPlaceDetails(placeId as string);
    res.status(STATUS_CODES.STATUS_OK).json(placeDetails);
  } catch (error) {
    res.status(STATUS_CODES.BAD_GATEWAY).json(error);
  }
}
