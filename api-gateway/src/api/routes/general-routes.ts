import express from "express";
import * as generalController from "@/api/controllers/general-controller"

const router = express.Router();

router.post("/signup", generalController.signup);
router.post("/logout", generalController.logout);


export default router;