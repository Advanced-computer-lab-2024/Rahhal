import express from "express";
import userRoutes from "./api/routes/user-routes";
import commplaintRoutes from "./api/routes/complaint-routes";

const app = express();
// Middleware
app.use(express.json());
// Routes
app.use("/users", userRoutes);
app.use("/complaints", commplaintRoutes);

export default app;
