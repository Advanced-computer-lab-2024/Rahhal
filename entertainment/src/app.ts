import express from "express";
import morgan from 'morgan';
import activitiesRoutes from "./api/routes/activities-routes";
import itinerariesRoutes from "./api/routes/itineraries-routes";
import preferenceTagRoutes from "./api/routes/preference-tags-routes";
import categoryRoutes from './api/routes/category-routes';
import historicalPlacesRoutes from "./api/routes/historical-places-routes";
import historicalTagsRoutes from "./api/routes/historical-tags-routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./api/swagger/swagger-output.json";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/activities", activitiesRoutes);
app.use("/itineraries", itinerariesRoutes);
app.use('/categories',categoryRoutes);
app.use('/historical-places', historicalPlacesRoutes);
app.use('/historical-tags', historicalTagsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/preference-tags", preferenceTagRoutes);
export default app;
