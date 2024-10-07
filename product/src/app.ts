import express from "express";
import productRoutes from "./api/routes/products-routes";

const app = express();

// Midleware
app.use(express.json());

/// Routes
app.use("/products", productRoutes);

export default app;
