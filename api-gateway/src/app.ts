import express from "express";
import morgan from "morgan";
import userRoutes from "@/api/routes/user-routes";
import productRoutes from "@/api/routes/product-routes";
import googleMapsRoutes from "@/api/routes/google-maps-routes";
import entertainmentRoutes from "@/api/routes/enterainment-routes";
import externalAPIRoutes from "@/api/routes/external-api-routes";
import cors from "cors";
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/google-maps", googleMapsRoutes);
app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/external/",externalAPIRoutes);

export default app;
