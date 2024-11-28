import express from "express";
import * as bookingController from "@/api/controllers/booking-controller";

const router = express.Router();

router.get("/", bookingController.getBookings);
router.get("/:id", bookingController.getBookingById);
router.get("/date/date-range", bookingController.getBookingByDateRange);
router.post("/", bookingController.createBooking);
router.patch("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

export default router;
