import express from "express";
import morgan from "morgan";
import orderRoutes from "./api/routes/order-routes";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// CORS
app.use(cors());

// Routes
app.use("/orders", orderRoutes);



export default app;
