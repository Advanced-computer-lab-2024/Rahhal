import express from "express";
import * as orderController from "../controllers/order-controller";

const router = express.Router();

// Order routes

router.get("/", orderController.getAllOrders); // Get all orders
router.get("/:id", orderController.getOrderById); // Get order by id
router.post("/", orderController.createOrder); // Create a new order
router.patch("/:id", orderController.updateOrder); // Update an existing order
router.delete("/:id", orderController.deleteOrder); // Delete an order
router.get("/user/:userId", orderController.getOrdersByUser); // Get orders by user
router.get("/status/:orderStatus", orderController.getOrdersByStatus); // Get orders by status
router.get("/seller/:seller", orderController.getOrdersBySeller); // Get orders by seller
router.get("/product/:productId", orderController.getOrdersByProduct); // Get orders by product
router.get("/date/date-range", orderController.getOrdersByDateRange); // Get orders by date range

export default router;