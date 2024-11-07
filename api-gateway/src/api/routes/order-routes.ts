import express from "express";
import * as orderController from "@/api/controllers/order-controller";
const router = express.Router();

router.get("/orders", orderController.getOrders);
router.get("/orders/:id", orderController.getOrderById);
router.get("/orders/date/date-range", orderController.getOrdersByDateRange); // Get orders by date range
router.post("/orders", orderController.createOrder);
router.patch("/orders/rate-product/:id", orderController.rateProduct);
router.patch("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

export default router;
