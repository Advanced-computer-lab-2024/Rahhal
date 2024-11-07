import express from "express";
import * as productsController from "../controllers/products-controller";

const router = express.Router();

router.get("/", productsController.getAllProducts);
router.get("/available", productsController.getAvailableProducts);
router.get("/:id", productsController.getProductById);
router.post("/", productsController.createProduct);
router.post("/:id/ratings", productsController.addRating);
router.patch("/ratings/:id", productsController.editRating);
router.patch("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteProduct);

export default router;
