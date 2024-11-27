import express from "express";
import bookingRoutes from "@/api/routes/bookings-routes";
import bookmarkRoutes from "@/api/routes/bookmarks-routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/bookings", bookingRoutes);
app.use("/bookmarks", bookmarkRoutes);

export default app;
