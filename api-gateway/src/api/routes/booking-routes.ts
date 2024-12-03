import express from "express";
import * as bookingController from "@/api/controllers/booking-controllers/booking-controller";
import * as bookmarkController from "@/api/controllers/booking-controllers/bookmark-controller";
import * as notifyRequestController from "@/api/controllers/booking-controllers/notify-request-controller";

const router = express.Router();

// Bookings routes
router.get("/bookings", bookingController.getBookings);
router.get("/bookings/:id", bookingController.getBookingById);
router.get("/bookings/date/date-range", bookingController.getBookingByDateRange);
router.post("/bookings", bookingController.createBooking);
router.patch("/bookings/:id", bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.deleteBooking);

// Bookmarks routes
router.get("/bookmarks", bookmarkController.getBookmarks);
router.get("/bookmarks/:id", bookmarkController.getBookmarkById);
router.post("/bookmarks", bookmarkController.createBookmark);
router.patch("/bookmarks/:id", bookmarkController.updateBookmark);
router.delete("/bookmarks", bookmarkController.deleteBookmark);
router.delete("/bookmarks/:id", bookmarkController.deleteBookmarkById);

// Notify requests routes
router.get("/notify-requests", notifyRequestController.getNotifyRequests);
router.get("/notify-requests/:id", notifyRequestController.getNotifyRequestById);
router.post("/notify-requests", notifyRequestController.createNotifyRequest);
router.patch("/notify-requests/:id", notifyRequestController.updateNotifyRequest);
router.delete("/notify-requests", notifyRequestController.deleteNotifyRequest);
router.delete("/notify-requests/:id", notifyRequestController.deleteNotifyRequestById);

export default router;
