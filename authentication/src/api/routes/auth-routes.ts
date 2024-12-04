import express from "express";
import * as authController from "@/api/controllers/auth-controller"
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/changePassword", authController.changePassword);
router.get("/verify/:token", authController.authenticate);
router.patch("/", authController.approveUser);
router.delete("/:id", authController.deleteUser);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword", authController.resetPassword);
router.patch("/verifyOTP", authController.verifyOTP);



export default router;