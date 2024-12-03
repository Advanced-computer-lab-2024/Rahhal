import express from "express";
import * as notifyRequestController from "@/api/controllers/notify-request-controller";

const router = express.Router();

router.get("/", notifyRequestController.getNotifyRequests);
router.get("/:id", notifyRequestController.getNotifyRequestById);
router.post("/", notifyRequestController.createNotifyRequest);
router.patch("/:id", notifyRequestController.updateNotifyRequest);
router.delete("/", notifyRequestController.deleteNotifyRequest);
router.delete("/:id", notifyRequestController.deleteNotifyRequestById);

export default router;
