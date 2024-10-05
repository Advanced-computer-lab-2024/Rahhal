import type { Request, Response } from "express";
import * as historicalPlacesService from "@/services/entertainment-services/historical-places-service";
import { STATUS_CODES } from "@/utils/constants";

// HistoricalPlaces controllers
export async function getAllHistoricalPlaces(req: Request, res: Response) {
  try {
    const historicalPlaces = await historicalPlacesService.getAllHistoricalPlaces();
    res.status(historicalPlaces.status).json(historicalPlaces.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getHistoricalPlaceById(req: Request, res: Response) {
  const historicalPlaceId = req.params.id;
  try {
    const historicalPlace = await historicalPlacesService.getHistoricalPlaceById(historicalPlaceId);
    res.status(historicalPlace.status).json(historicalPlace.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createHistoricalPlace(req: Request, res: Response) {
  const historicalPlaceData = req.body;
  try {
    const historicalPlace = await historicalPlacesService.createHistoricalPlace(historicalPlaceData);
    res.status(historicalPlace.status).json(historicalPlace.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateHistoricalPlace(req: Request, res: Response) {
  const historicalPlaceId = req.params.id;
  const historicalPlaceData = req.body;
  try {
    const historicalPlace = await historicalPlacesService.updateHistoricalPlace(historicalPlaceId, historicalPlaceData);
    res.status(historicalPlace.status).json(historicalPlace.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteHistoricalPlace(req: Request, res: Response) {
  const historicalPlaceId = req.params.id;
  try {
    const historicalPlace = await historicalPlacesService.deleteHistoricalPlace(historicalPlaceId);
    res.status(historicalPlace.status).json(historicalPlace.data);
  }
  catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
