import express from "express";
import * as productsController from "../controllers/products-controller";

const router = express.Router();

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.createProduct);
router.patch("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

export default router;