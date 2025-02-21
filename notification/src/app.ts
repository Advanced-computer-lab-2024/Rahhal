import cors from "cors";
import morgan from "morgan";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "@/api/swagger/swagger-output.json";
import notificationRoutes from "@/api/routes/notification-routes";

const app = express();

// Midleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// Routes
app.use("/notifications", notificationRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
