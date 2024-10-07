import express from "express";
import * as googleMapsController from "@/api/controllers/google-maps-controller";

const router = express.Router();

router.get("/autocomplete", googleMapsController.getPlaceAutocomplete);
router.get("/place-details", googleMapsController.getPlaceDetailsById);
router.get("/place-details/location", googleMapsController.getPlaceDetailsByLocation);

export default router;
