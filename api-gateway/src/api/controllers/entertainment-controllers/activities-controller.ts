import type { Request, Response } from "express";
import * as activityService from "@/services/entertainment-services/activities-service";
import { STATUS_CODES } from "@/utils/constants";

// Activities controllers
export async function getAllActivities(req: Request, res: Response) {
  try {
    const activities = await activityService.getAllActivities();
    res.status(activities.status).json(activities.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function getActivityById(req: Request, res: Response) {
  const activityId = req.params.id;
  try {
    const activity = await activityService.getActivityById(activityId);
    res.status(activity.status).json(activity.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function createActivity(req: Request, res: Response) {
  const activityData = req.body;
  try {
    const activity = await activityService.createActivity(activityData);
    res.status(activity.status).json(activity.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function updateActivity(req: Request, res: Response) {
  const activityId = req.params.id;
  const activityData = req.body;
  try {
    const activity = await activityService.updateActivity(activityId, activityData);
    res.status(activity.status).json(activity.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}

export async function deleteActivity(req: Request, res: Response) {
  const activityId = req.params.id;
  try {
    const activity = await activityService.deleteActivity(activityId);
    res.status(activity.status).json(activity.data);
  } catch (error) {
    res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
  }
}
