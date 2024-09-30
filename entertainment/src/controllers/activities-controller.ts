import express from "express";
import * as activitiesService from "../service/activities-service";


// Get all activities
exports.getAllActivities = async (req: express.Request, res: express.Response) => {
try {
   
    const activities = await activitiesService.getAllActivities();
    res.status(200).json(activities);
  } catch (error: Error) {
    res.status(500).json({ message: error.message });
  }
};

// Get activity by id
exports.getActivityById = async (req: express.Request, res: express.Response) => {
  try {
    const activity = await activitiesService.getActivityById(req.params.id);
    if (!activity) {
      res.status(404).json({ message: "Activity not found" });
    } else {
      res.status(200).json(activity);
    }
  } catch (error: Error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new activity
exports.createActivity = async (req: express.Request, res: express.Response) => {
  try {
    
    const activity = await activitiesService.createActivity(req.body);
    res.status(201).json(activity);
  } catch (error : Error) {
    res.status(500).json({ message: error.message });
  }
};


// Update an existing activity
exports.updateActivity = async (req: express.Request, res: express.Response) => {
  try {
    const activity = await activitiesService.updateActivity(req.params.id, req.body);
    if (!activity) {
      res.status(404).json({ message: "Activity not found" });
    } else {
      res.status(200).json(activity);
    }
  } catch (error: Error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an activity
exports.deleteActivity = async (req: express.Request, res: express.Response) => {
  try {
    const activity = await activitiesService.deleteActivity(req.params.id);
    if (!activity) {
      res.status(404).json({ message: "Activity not found" });
    } else {
      res.status(200).json({ message: "Activity deleted" });
    }
  } catch (error: Error) {
    res.status(500).json({ message: error.message });
  }
};

