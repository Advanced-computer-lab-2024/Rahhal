import express from "express";
import * as promocodeController from "@/api/controllers/payment-controllers/promocode-controller";

const router = express.Router();

router.get("/promocode", promocodeController.getAllPromocodes);
router.post("/promocode", promocodeController.createPromocode);
router.patch("/promocode/:id", promocodeController.updatePromocode);
router.delete("/promocode/:id", promocodeController.deletePromocode);
router.post("/promocode/:id", promocodeController.applyPromocode);

export default router;