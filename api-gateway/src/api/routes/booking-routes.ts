import express from "express";
import * as bookingController from "@/api/controllers/booking-controller";

const router = express.Router();

router.get("/bookings", bookingController.getBookings);
router.post("/bookings", bookingController.createBooking);
router.patch("/bookings/:id", bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.deleteBooking);

export default router;
