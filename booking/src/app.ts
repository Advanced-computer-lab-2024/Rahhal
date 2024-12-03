import express from "express";
import bookingRoutes from "@/api/routes/bookings-routes";
import bookmarkRoutes from "@/api/routes/bookmarks-routes";
import notifyRequestRoutes from "@/api/routes/notify-requests-routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/bookings", bookingRoutes);
app.use("/bookmarks", bookmarkRoutes);
app.use("/notify-requests", notifyRequestRoutes);

export default app;
