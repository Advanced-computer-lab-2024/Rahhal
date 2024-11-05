import express from "express";
import * as userController from "../controllers/user-controller";

const router = express.Router();
// for user routes
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);
router.patch("/:id", userController.updateUserById);

router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.post("/:id/ratings", userController.addRating);
router.post("/login", userController.loginUser);
router.patch("/:id/redeem", userController.redeemPoints);

export default router;
