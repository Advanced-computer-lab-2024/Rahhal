import type { Request, Response } from "express";
import * as activitiesService from "../../services/activities-service";
import { STATUS_CODES } from "../../utils/constants";

export async function getAllActivities(
  req: Request,
  res: Response,
) {
  try {
    const activities = await activitiesService.getAllActivities();
    res.status(STATUS_CODES.STATUS_OK).json(activities);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function getActivityById(
  req: Request,
  res: Response,
) {
  try {
    const activity = await activitiesService.getActivityById(req.params.id);
    if (!activity) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Activity not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(activity);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function createActivity(
  req: Request,
  res: Response,
) {
  try {
    const activity = await activitiesService.createActivity(req.body);
    res.status(STATUS_CODES.CREATED).json(activity);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function updateActivity(
  req: Request,
  res: Response,
) {
  try {
    const activity = await activitiesService.updateActivity(
      req.params.id,
      req.body,
    );
    if (!activity) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Activity not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(activity);
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}

export async function deleteActivity(
  req: Request,
  res: Response,
) {
  try {
    const activity = await activitiesService.deleteActivity(req.params.id);
    if (!activity) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Activity not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json({ message: "Activity deleted" });
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
