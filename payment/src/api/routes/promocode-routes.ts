import express from "express";
import * as promocodeController from "@/api/controllers/promocode-controller";
const router = express.Router();

router.get("/", promocodeController.getAllPromocodes);
router.post("/", promocodeController.createPromocode);
router.patch("/:id", promocodeController.updatePromocode);
router.delete("/:id", promocodeController.deletePromocode);
router.post("/:id", promocodeController.applyPromocode);
router.post("/use/:id", promocodeController.usePromocode);


export default router;