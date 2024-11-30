import express from "express";
import * as orderController from "@/api/controllers/order-controllers/order-controller";
import * as wishlistController from "@/api/controllers/order-controllers/wishlist-controller";
const router = express.Router();

// Order routes
router.get("/orders", orderController.getOrders);
router.get("/orders/:id", orderController.getOrderById);
router.get("/orders/date/date-range", orderController.getOrdersByDateRange); // Get orders by date range
router.post("/orders", orderController.createOrder);
router.patch("/orders/rate-product/:id", orderController.rateProduct);
router.patch("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

// Wishlist routes
router.get("/wishlists", wishlistController.getWishlist);
router.get("/wishlists/:id", wishlistController.getWishlistById);
router.post("/wishlists", wishlistController.createWishlist);
router.patch("/wishlists/:id", wishlistController.updateWishlist);
router.delete("/wishlists", wishlistController.deleteWishlistItem);
router.delete("/wishlists/:id", wishlistController.deleteWishlist);

export default router;
