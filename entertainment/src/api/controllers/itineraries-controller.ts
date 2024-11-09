import type express from "express";
import * as itinerariesService from "@/services/itineraries-service";
import { STATUS_CODES } from "@/utils/constants";
import type { IRating } from "@/database/shared";

export async function getAllItineraries(req: express.Request, res: express.Response) {
  try {
    const ownerId = req.query.ownerId as string;
    const filter = ownerId ? { owner: ownerId } : {};
    const itineraries = await itinerariesService.getAllItineraries(filter);

    res.status(STATUS_CODES.STATUS_OK).json(itineraries);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function getActiveAppropriateItineraries(req: express.Request, res: express.Response) {
  try {
    const itineraries = await itinerariesService.getActiveAppropriateItineraries();
    res.status(STATUS_CODES.STATUS_OK).json(itineraries);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function getItineraryById(req: express.Request, res: express.Response) {
  const entityAvailability = req.query.avail as string;
  try {
    const itinerary = await itinerariesService.getItineraryById(req.params.id);
    if (!itinerary || (entityAvailability && itinerary.deleted)) {
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

export async function addRating(req: express.Request, res: express.Response) {
  try {
    const itineraryId = req.params.id;
    const userRating = req.body as IRating;
    const rating = await itinerariesService.addRating(userRating, itineraryId);
    if (!rating) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Itinerary not found" });
    } else {
      res.status(STATUS_CODES.CREATED).json(rating);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
