import express from "express";
import * as activitiesService from "../service/activities-service";
import {STATUS_CODES} from "../utils/constants";

// Get all activities
export async function getAllActivities(req: express.Request, res: express.Response){
  try {
   
    const activities = await activitiesService.getAllActivities();
    res.status(STATUS_CODES.STATUS_OK).json(activities);
  } catch (error: Error) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: error.message });
  }
};

// Get activity by id
export async function getActivityById(req: express.Request, res: express.Response) {
  try {
    const activity = await activitiesService.getActivityById(req.params.id);
    if (!activity) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Activity not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(activity);
    }
  } catch (error: Error) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: error.message });
  }
};


// Create a new activity
export async function createActivity(req: express.Request, res: express.Response) {
  try {
    
    const activity = await activitiesService.createActivity(req.body);
    res.status(STATUS_CODES.CREATED).json(activity);
  } catch (error : Error) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: error.message });
  }
};


// Update an existing activity
export async function updateActivity(req: express.Request, res: express.Response) {
  try {
    const activity = await activitiesService.updateActivity(req.params.id, req.body);
    if (!activity) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Activity not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json(activity);
    }
  } catch (error: Error) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: error.message });
  }
};

// Delete an activity
export async function deleteActivity(req: express.Request, res: express.Response) {
  try {
    const activity = await activitiesService.deleteActivity(req.params.id);
    if (!activity) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Activity not found" });
    } else {
      res.status(STATUS_CODES.STATUS_OK).json({ message: "Activity deleted" });
    }
  } catch (error: Error) {
    res.status(STATUS_CODES.SERVER_ERROR).json({ message: error.message });
  }
};

