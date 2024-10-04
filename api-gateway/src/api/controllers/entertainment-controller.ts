import type { Request, Response } from "express";
import * as entertainmentService from "@/services/entertainment-service";
import { STATUS_CODES } from "@/utils/constants";

export async function getAllActivities(req: Request, res: Response) {
  try {
    const activities = await entertainmentService.getAllActivities();
    res.status(activities.status).json(activities.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getActivityById(req: Request, res: Response) {
  try {
    const activity = await entertainmentService.getActivityById(req.params.id);
    res.status(activity.status).json(activity.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createActivity(req: Request, res: Response) {
  try {
    const activity = await entertainmentService.createActivity(req.body);
    res.status(activity.status).json(activity.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateActivity(req: Request, res: Response) {
  try {
    const activity = await entertainmentService.updateActivity(req.params.id, req.body);
    res.status(activity.status).json(activity.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteActivity(req: Request, res: Response) {
  try {
    const activity = await entertainmentService.deleteActivity(req.params.id);
    res.status(activity.status).json(activity.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getAllItineraries(req: Request, res: Response) {
  try {
    const itinerary = await entertainmentService.getAllItineraries();
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getAItineraryById(req: Request, res: Response) {
  try {
    const itinerary = await entertainmentService.getItineraryById(req.params.id);
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createItinerary(req: Request, res: Response) {
  try {
    const itinerary = await entertainmentService.createItinerary(req.body);
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
export async function updateItinerary(req: Request, res: Response) {
  try {
    const itinerary = await entertainmentService.updateItinerary(req.params.id, req.body);
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
export async function deleteItinerary(req: Request, res: Response) {
  try {
    const itinerary = await entertainmentService.deleteItinerary(req.params.id);
    res.status(itinerary.status).json(itinerary.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getAllPreferenceTags(req: Request, res: Response) {
  try {
    const preferenceTag = await entertainmentService.getAllPreferenceTags();
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getPreferenceTagById(req: Request, res: Response) {
  try {
    const preferenceTag = await entertainmentService.getPreferenceTagById(req.params.id);
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createPreferenceTag(req: Request, res: Response) {
  try {
    const preferenceTag = await entertainmentService.createPreferenceTag(req.body);
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updatePreferenceTag(req: Request, res: Response) {
  try {
    const preferenceTag = await entertainmentService.updatePreferenceTag(req.params.id, req.body);
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deletePreferenceTag(req: Request, res: Response) {
  try {
    const preferenceTag = await entertainmentService.deleteActivity(req.params.id);
    res.status(preferenceTag.status).json(preferenceTag.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
