import express from "express";
import * as wishlistController from "@/api/controllers/wishlist-controller";

const router = express.Router();

router.get("/", wishlistController.getWishlist);
router.get("/:id", wishlistController.getWishlistById);
router.post("/", wishlistController.createWishlist);
router.patch("/:id", wishlistController.updateWishlist);
router.delete("/", wishlistController.deleteWishlistItem);
router.delete("/:id", wishlistController.deleteWishlist);

export default router;
