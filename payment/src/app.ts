import express from "express";
import morgan from "morgan";
import cors from "cors";
import promocodeRoutes from "./api/routes/promocode-routes";
import stripeRoutes from "./api/routes/stripe-routes";
import { sendNotificationReceipt } from "@/api/controllers/payment-notification-controller";

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/promocode", promocodeRoutes);
app.use("/stripe", stripeRoutes);

// Notification
app.post("/payment-notification", sendNotificationReceipt);

export default app;
