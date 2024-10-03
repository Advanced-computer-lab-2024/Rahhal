import type express from "express";
import * as itinerariesService from "../../services/itineraries-service";
import { STATUS_CODES } from "../../utils/constants";

export async function getAllItineraries(req: express.Request, res: express.Response) {
  try {
    const itineraries = await itinerariesService.getAllItineraries();
    res.status(STATUS_CODES.STATUS_OK).json(itineraries);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function getItineraryById(req: express.Request, res: express.Response) {
  try {
    const itinerary = await itinerariesService.getItineraryById(req.params.id);
    if (!itinerary) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Itinerary not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(itinerary);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function createItinerary(req: express.Request, res: express.Response) {
  try {
    const itinerary = await itinerariesService.createItinerary(req.body);
    res.status(STATUS_CODES.CREATED).json(itinerary);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function updateItinerary(req: express.Request, res: express.Response) {
  try {
    const itinerary = await itinerariesService.updateItinerary(req.params.id, req.body);
    if (!itinerary) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Itinerary not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(itinerary);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function deleteItinerary(req: express.Request, res: express.Response) {
  try {
    const itinerary = await itinerariesService.deleteItinerary(req.params.id);
    if (!itinerary) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Itinerary not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(itinerary);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
