import express from "express";
import * as itinerariesController from "../controllers/itineraries-controller";

const router = express.Router();

router.get("/", itinerariesController.getAllItineraries); // Get all itineraries
router.get("/:id", itinerariesController.getItineraryById); // Get itinerary by id
router.post("/", itinerariesController.createItinerary); // Create a new itinerary
router.put("/:id", itinerariesController.updateItinerary); // Update an existing itinerary
router.delete("/:id", itinerariesController.deleteItinerary); // Delete an itinerary

export default router;
