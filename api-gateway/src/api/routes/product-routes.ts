import express from "express";
import * as productController from "@/api/controllers/product-controllers";
import grantAccess, { Role } from "@/utils/auth";
const router = express.Router();

//products routes
router.get("/products", grantAccess([Role.ADMIN, Role.SELLER]), productController.getAllProducts);
router.get("/products/available", grantAccess([Role.ADMIN, Role.TOURIST, Role.GUEST]), productController.getAvailableProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

export default router;
