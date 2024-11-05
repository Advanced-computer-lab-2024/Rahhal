import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoutes from "@/api/routes/user-routes";
import productRoutes from "@/api/routes/product-routes";
import googleMapsRoutes from "@/api/routes/google-maps-routes";
import entertainmentRoutes from "@/api/routes/enterainment-routes";
import exchangeRatesRoutes from "@/api/routes/exchange-rates-routes";
import transportationRoutes from "@/api/routes/trasportation-routes";
import ratingRoutes from "@/api/routes/rating-routes";
import firebaseRoutes from "@/api/routes/firebase-routes";
import bookingRoutes from "@/api/routes/booking-routes";
const app = express();

// Middleware
app.use(fileUpload({ preservePath: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/google-maps", googleMapsRoutes);
app.use("/api/entertainment", entertainmentRoutes);
app.use("/api/firebase", firebaseRoutes);
app.use("/api/exchange-rates", exchangeRatesRoutes);
app.use("/api/transportation", transportationRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/rating", ratingRoutes);

export default app;
