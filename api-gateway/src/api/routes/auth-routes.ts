import express from "express";
import * as authController from "@/api/controllers/auth-controller"

const router = express.Router();


router.post("/login",authController.login);
router.patch("/changePassword" , authController.changePassword); //requires authentication
router.patch("/", authController.approveUser);
// router.delete("/" , authController.deleteUser);


export default router;