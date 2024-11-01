import express from "express";
import * as activitiesController from "../controllers/activities-controller";

const router = express.Router();

// Activities routes

router.get("/", activitiesController.getAllActivities); // Get all activities
router.get("/", activitiesController.getAppropriateActivities); // Get all appropriate activities
router.get("/:id", activitiesController.getActivityById); // Get activity by id
router.post("/", activitiesController.createActivity); // Create a new activity
router.patch("/:id", activitiesController.updateActivity); // Update an existing activity
router.delete("/:id", activitiesController.deleteActivity); // Delete an activity

export default router;
