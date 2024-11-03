import express from "express";
import {
  getTransportationOffers,
  getAirportCodes,
} from "@/api/controllers/transportation-controller";

const router = express.Router();

router.post("/", getTransportationOffers);
router.get("/airport-code", getAirportCodes);

export default router;
