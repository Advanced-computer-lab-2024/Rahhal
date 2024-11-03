import express from "express";
import { getTransportationOffers } from "@/api/controllers/transportation-controller";

const router = express.Router();

router.post("/", getTransportationOffers);

export default router;
