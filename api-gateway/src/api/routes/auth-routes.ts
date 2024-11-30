import express from "express";
import * as authController from "@/api/controllers/auth-controller"

const router = express.Router();


router.post("/login", authController.login);
router.patch("/changePassword", authController.changePassword); //requires authentication


export default router;