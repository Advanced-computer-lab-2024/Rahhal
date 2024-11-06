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
const app = express();

// Middleware
app.use(cors());
app.use(fileUpload({ preservePath: true }));
app.use(express.json());
app.use(morgan("dev"));

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
app.use("/api/booking", bookingRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/order", orderRoutes);

export default app;
