import express from "express";
import { getFlightOffers } from "@/api/controllers/flights-search-controller";

const router = express.Router();

router.post("/", getFlightOffers);

export default router;
