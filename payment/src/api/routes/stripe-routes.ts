import express from "express";
import * as stripeController from "@/api/controllers/stripe-controller";
const router = express.Router();

router.post("/create-payment-intent", stripeController.createPaymentIntent);

export default router;
