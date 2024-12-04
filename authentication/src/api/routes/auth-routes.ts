import express from "express";
import * as authController from "@/api/controllers/auth-controller"
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/changePassword", authController.changePassword);
router.get("/verify/:token", authController.authenticate);
router.patch("/", authController.approveUser);
router.delete("/:id", authController.deleteUser);



export default router;