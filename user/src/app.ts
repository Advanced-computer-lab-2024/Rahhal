import express from "express";
import userRoutes from "./api/routes/user-routes";


const app = express();
// Middleware
app.use(express.json());
// Routes
app.use("/users", userRoutes);




export default app;