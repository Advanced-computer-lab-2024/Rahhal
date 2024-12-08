import express from "express";
import * as promocodeController from "@/api/controllers/payment-controllers/promocode-controller";
import * as stripeController from "@/api/controllers/payment-controllers/stripe-controller";

const router = express.Router();

// Promocode
router.get("/promocode", promocodeController.getAllPromocodes);
router.post("/promocode", promocodeController.createPromocode);
router.patch("/promocode/:id", promocodeController.updatePromocode);
router.delete("/promocode/:id", promocodeController.deletePromocode);
router.post("/promocode/:id", promocodeController.applyPromocode);
router.post("/promocode/use/:id", promocodeController.usePromocode);

// Stripe
router.post("/create-payment-intent", stripeController.createPaymentIntent);

export default router;
