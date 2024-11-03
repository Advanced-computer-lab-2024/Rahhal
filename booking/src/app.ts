import express from "express";
import bookingRoutes from "@/api/routes/bookings-routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/bookings", bookingRoutes);

export default app;
