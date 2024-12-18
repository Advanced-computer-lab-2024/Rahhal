import cors from "cors";
import morgan from "morgan";
import express from "express";
import fileUpload from "express-fileupload";
import userRoutes from "@/api/routes/user-routes";
import productRoutes from "@/api/routes/product-routes";
import bookingRoutes from "@/api/routes/booking-routes";
import firebaseRoutes from "@/api/routes/firebase-routes";
import googleMapsRoutes from "@/api/routes/google-maps-routes";
import entertainmentRoutes from "@/api/routes/enterainment-routes";
import flightSearchRoutes from "@/api/routes/flights-search-routes";
import exchangeRatesRoutes from "@/api/routes/exchange-rates-routes";
import transportationRoutes from "@/api/routes/trasportation-routes";
import ratingRoutes from "@/api/routes/rating-routes";
import orderRoutes from "@/api/routes/order-routes";
import externalApiRoutes from "@/api/routes/external-api-routes";
import paymentRoutes from "@/api/routes/payment-routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./api/swagger/swagger-output.json";
import authRoutes from "@/api/routes/auth-routes";
import generalRoutes from "@/api/routes/general-routes";
import { authStateMiddleware } from "@/api/controllers/auth-controller";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
  }));
app.use(fileUpload({ preservePath: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(authStateMiddleware);

// Setup Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/firebase", firebaseRoutes);
app.use("/api/google-maps", googleMapsRoutes);
app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/flights-search", flightSearchRoutes);
app.use("/api/exchange-rates", exchangeRatesRoutes);
app.use("/api/transportation", transportationRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/external-api", externalApiRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/", generalRoutes);

export default app;
