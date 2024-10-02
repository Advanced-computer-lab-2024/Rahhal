import express from "express";
import activitiesRoutes from "./api/routes/activities-routes";
import preferenceTagRoutes from "./api/routes/preference-tags-routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./api/swagger/swagger-output.json";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/activities", activitiesRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/preference-tags", preferenceTagRoutes);
export default app;
