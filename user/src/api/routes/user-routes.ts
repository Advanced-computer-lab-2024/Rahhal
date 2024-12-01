import express from "express";
import * as userController from "../controllers/user-controller";

const router = express.Router();
// for user routes
router.get("/number-of-users", userController.getNumberOfUsers);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUsers);
router.patch("/:id", userController.updateUser);

router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.post("/:id/ratings", userController.addRating);
router.post("/login", userController.loginUser);
router.patch("/:id/redeem", userController.redeemPoints);

export default router;
