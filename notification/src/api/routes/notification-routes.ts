import express from "express";
import * as notificationController from "@/api/controllers/notification-controller";

const router = express.Router();

// Notification routes
router.patch("/seen", notificationController.markAllNotificationsAsSeen);
router.get("/", notificationController.getAllNotifications);
router.get("/stream", notificationController.sseStream);
router.get("/:id", notificationController.getNotificationById);
router.post("/", notificationController.createNotification);
router.patch("/:id", notificationController.updateNotification);
router.delete("/:id", notificationController.deleteNotificationById);
router.delete("/", notificationController.deleteNotifications);
router.patch("/:id/seen", notificationController.markNotificationAsSeen);

export default router;
