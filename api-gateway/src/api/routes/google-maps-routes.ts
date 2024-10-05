import express from "express";
import * as googleMapsController from "@/api/controllers/google-maps-controller";

const router = express.Router();

router.get("/autocomplete", googleMapsController.getPlaceAutocomplete);
router.get("/place-details", googleMapsController.getPlaceDetails);

export default router;
