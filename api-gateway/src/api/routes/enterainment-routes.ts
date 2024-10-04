import express from "express";
import * as entertainmentController from "@/api/controllers/entertainment-controller";

const router = express.Router();

router.get("/activities", entertainmentController.getAllActivities);
router.get("/activities/:id", entertainmentController.getAItineraryById);
router.get("/itineraries", entertainmentController.getAllItineraries);
router.get("/itineraries/:id", entertainmentController.getAItineraryById);
router.get("/preference-tags", entertainmentController.getAllPreferenceTags);
router.get("/preference-tags/:id", entertainmentController.getPreferenceTagById);
router.post("/activities", entertainmentController.createActivity);
router.post("itineraries", entertainmentController.createItinerary);
router.post("/preference-tags", entertainmentController.createPreferenceTag);
router.patch("/activities/:id", entertainmentController.updateActivity);
router.patch("/itineraries/:id", entertainmentController.updateItinerary);
router.patch("preference-tags/:id", entertainmentController.updatePreferenceTag);
router.delete("/activities/:id", entertainmentController.deleteActivity);
router.delete("/itineraries/:id", entertainmentController.deleteItinerary);
router.delete("/preference-tags/:id", entertainmentController.deletePreferenceTag);

export default router;
