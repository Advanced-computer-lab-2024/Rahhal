import express from "express";
import * as activitiesController from "@/api/controllers/entertainment-controllers/activities-controller";
import * as itinerariesController from "@/api/controllers/entertainment-controllers/itineraries-controller";
import * as preferenceTagsController from "@/api/controllers/entertainment-controllers/preference-tags-controller";
import * as historicalTagsController from "@/api/controllers/entertainment-controllers/historical-tags-controller";
import * as historicalPlacesController from "@/api/controllers/entertainment-controllers/historical-places-controller";
import * as categoriesController from "@/api/controllers/entertainment-controllers/categories-controller";

const router = express.Router();
//activites routes
router.get("/activities", activitiesController.getAllActivities);
router.get("/activities/appropriate", activitiesController.getAppropriateActivities);
router.get("/activities/:id", activitiesController.getActivityById);
router.post("/activities", activitiesController.createActivity);
router.patch("/activities/:id", activitiesController.updateActivity);
router.delete("/activities/:id", activitiesController.deleteActivity);

//itineraries routes
router.get("/itineraries", itinerariesController.getAllItineraries);
router.get("/itineraries/active-appropriate", itinerariesController.getActiveAppropriateItineraries);
router.get("/itineraries/:id", itinerariesController.getAItineraryById);
router.post("/itineraries", itinerariesController.createItinerary);
router.patch("/itineraries/:id", itinerariesController.updateItinerary);
router.delete("/itineraries/:id", itinerariesController.deleteItinerary);

//preference-tags routes
router.get("/preference-tags", preferenceTagsController.getAllPreferenceTags);
router.get("/preference-tags/:id", preferenceTagsController.getPreferenceTagById);
router.post("/preference-tags", preferenceTagsController.createPreferenceTag);
router.patch("/preference-tags/:id", preferenceTagsController.updatePreferenceTag);
router.delete("/preference-tags/:id", preferenceTagsController.deletePreferenceTag);

//historical-tags routes
router.get("/historical-tags", historicalTagsController.getAllHistoricalTags);
router.get("/historical-tags/:id", historicalTagsController.getHistoricalTagById);
router.post("/historical-tags", historicalTagsController.createHistoricalTag);

//historical-places routes
router.get("/historical-places", historicalPlacesController.getAllHistoricalPlaces);
router.get("/historical-places/:id", historicalPlacesController.getHistoricalPlaceById);
router.post("/historical-places", historicalPlacesController.createHistoricalPlace);
router.patch("/historical-places/:id", historicalPlacesController.updateHistoricalPlace);
router.delete("/historical-places/:id", historicalPlacesController.deleteHistoricalPlace);

//categories routes
router.get("/categories", categoriesController.getAllCategories);
router.get("/categories/:id", categoriesController.getCategoryById);
router.post("/categories", categoriesController.createCategory);
router.patch("/categories/:id", categoriesController.updateCategory);
router.delete("/categories/:id", categoriesController.deleteCategory);

export default router;
