import express from "express";
import * as itinerariesController from "../controllers/itineraries-controller";

const router = express.Router();

router.get("/", itinerariesController.getAllItineraries); // Get all itineraries
router.get("/active-appropriate", itinerariesController.getActiveAppropriateItineraries); // Get all active & appropriate itineraries
router.get("/:id", itinerariesController.getItineraryById); // Get itinerary by id
router.post("/", itinerariesController.createItinerary); // Create a new itinerary
router.patch("/:id", itinerariesController.updateItinerary); // Update an existing itinerary
router.delete("/:id", itinerariesController.deleteItinerary); // Delete an itinerary
router.post("/:id/ratings", itinerariesController.addRating); // Add rating to an itinerary

export default router;
