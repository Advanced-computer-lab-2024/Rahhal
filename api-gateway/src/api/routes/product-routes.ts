import express from "express";
import * as productController from "@/api/controllers/product-controllers";

const router = express.Router();

//products routes
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

export default router;
