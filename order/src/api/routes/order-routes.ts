import express from "express";
import * as orderController from "../controllers/order-controller";

const router = express.Router();

// Order routes

router.get("/", orderController.getOrders); // Get orders
router.get("/:id", orderController.getOrderById); // Get order by id
router.get("/date/date-range", orderController.getOrdersByDateRange); // Get orders by date range
router.post("/", orderController.createOrder); // Create a new order
router.patch("/:id", orderController.updateOrder); // Update an existing order
router.delete("/:id", orderController.deleteOrder); // Delete an order


export default router;