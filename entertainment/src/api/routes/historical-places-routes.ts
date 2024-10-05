import express from "express";
import * as historicalPlacesController from "../controllers/historical-places-controller";

const router = express.Router();

// HistoricalPlaces routes

router.get("/", historicalPlacesController.getAllHistoricalPlaces);
router.get("/:id", historicalPlacesController.getHistoricalPlaceById);
router.post("/", historicalPlacesController.createHistoricalPlace);
router.put("/:id", historicalPlacesController.updateHistoricalPlace);
router.delete("/:id", historicalPlacesController.deleteHistoricalPlace);

export default router;
