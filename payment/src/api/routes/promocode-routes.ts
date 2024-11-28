import express from "express";
import * as promocodeController from "@/api/controllers/promocode-controller";
const router = express.Router();

router.get("/", promocodeController.getAllPromocodes);
router.post("/", promocodeController.createPromocode);
router.put("/:id", promocodeController.updatePromocode);
router.delete("/:id", promocodeController.deletePromocode);
router.get("/:id", promocodeController.validatePromocode);


export default router;