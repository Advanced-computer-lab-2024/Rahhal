import express from "express";
import morgan from "morgan";
import cors from "cors";

import promocodeRoutes from "./api/routes/promocode-routes";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/promocode", promocodeRoutes)

export default app;