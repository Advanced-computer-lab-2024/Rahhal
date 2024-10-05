import express from "express";
import morgan from 'morgan';
import entertainmentRoutes from "@/api/routes/enterainment-routes";
import userRoutes from "@/api/routes/user-routes";
import productRoutes from "@/api/routes/product-routes";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

export default app;
