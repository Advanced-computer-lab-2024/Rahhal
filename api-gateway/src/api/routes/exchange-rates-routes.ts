import express from "express";
import * as exchangeRatesController from "@/api/controllers/exchange-rates-controller";

const router = express.Router();

router.get("/latest", exchangeRatesController.getLatestExchangeRates);

export default router;
