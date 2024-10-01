import express from "express";
import activitiesRoutes from "./api/routes/activities-routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/activities", activitiesRoutes);

export default app;
