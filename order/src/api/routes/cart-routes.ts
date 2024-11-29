import express from "express";
import * as cartController from "../controllers/cart-controller";

const router = express.Router();

// Cart routes
router.get("/", cartController.getCart); // Get cart 
router.post("/", cartController.createCart); // Create cart 
router.delete("/", cartController.deleteCart); // Delete cart 
router.patch("/", cartController.updateCart); // Update cart 

export default router;