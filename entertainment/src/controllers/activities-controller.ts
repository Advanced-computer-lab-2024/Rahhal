import express from "express";
import * as activitiesService from "../service/activities-service";
import status_codes from "../utils/constants";

// Get all activities
exports.getAllActivities = async (req: express.Request, res: express.Response) => {
try {
   
    const activities = await activitiesService.getAllActivities();
    res.status(status_codes.STATUS_OK).json(activities);
  } catch (error: Error) {
    res.status(status_codes.SERVER_ERROR).json({ message: error.message });
  }
};

// Get activity by id
exports.getActivityById = async (req: express.Request, res: express.Response) => {
  try {
    const activity = await activitiesService.getActivityById(req.params.id);
    if (!activity) {
      res.status(status_codes.NOT_FOUND).json({ message: "Activity not found" });
    } else {
      res.status(status_codes.STATUS_OK).json(activity);
    }
  } catch (error: Error) {
    res.status(status_codes.SERVER_ERROR).json({ message: error.message });
  }
};


// Create a new activity
exports.createActivity = async (req: express.Request, res: express.Response) => {
  try {
    
    const activity = await activitiesService.createActivity(req.body);
    res.status(status_codes.CREATED).json(activity);
  } catch (error : Error) {
    res.status(status_codes.SERVER_ERROR).json({ message: error.message });
  }
};


// Update an existing activity
exports.updateActivity = async (req: express.Request, res: express.Response) => {
  try {
    const activity = await activitiesService.updateActivity(req.params.id, req.body);
    if (!activity) {
      res.status(status_codes.NOT_FOUND).json({ message: "Activity not found" });
    } else {
      res.status(status_codes.STATUS_OK).json(activity);
    }
  } catch (error: Error) {
    res.status(status_codes.SERVER_ERROR).json({ message: error.message });
  }
};

// Delete an activity
exports.deleteActivity = async (req: express.Request, res: express.Response) => {
  try {
    const activity = await activitiesService.deleteActivity(req.params.id);
    if (!activity) {
      res.status(status_codes.NOT_FOUND).json({ message: "Activity not found" });
    } else {
      res.status(status_codes.STATUS_OK).json({ message: "Activity deleted" });
    }
  } catch (error: Error) {
    res.status(status_codes.SERVER_ERROR).json({ message: error.message });
  }
};

