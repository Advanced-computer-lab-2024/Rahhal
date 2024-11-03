import type { Request, Response } from "express";
import * as itinerariesService from "@/services/entertainment-services/itineraries-service";
import { STATUS_CODES } from "@/utils/constants";

// Itineraries controllers
export async function getAllItineraries(req: Request, res: Response) {
  try {
    const itinerary = await itinerariesService.getAllItineraries();
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
export async function getActiveAppropriateItineraries(req: Request, res: Response) {
  try {
    const itinerary = await itinerariesService.getActiveAppropriateItineraries();
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getAItineraryById(req: Request, res: Response) {
  const itineraryId = req.params.id;
  try {
    const itinerary = await itinerariesService.getItineraryById(itineraryId);
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createItinerary(req: Request, res: Response) {
  const itineraryData = req.body;
  try {
    const itinerary = await itinerariesService.createItinerary(itineraryData);
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
export async function updateItinerary(req: Request, res: Response) {
  const itineraryId = req.params.id;
  const itineraryData = req.body;
  try {
    const itinerary = await itinerariesService.updateItinerary(itineraryId, itineraryData);
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
export async function deleteItinerary(req: Request, res: Response) {
  const itineraryId = req.params.id;
  try {
    const itinerary = await itinerariesService.deleteItinerary(itineraryId);
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
