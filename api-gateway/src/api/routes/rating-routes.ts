import { Router } from "express";
import * as ratingsController from "@/api/controllers/rating-controller";

const router = Router();

router.post("/", ratingsController.createRating);

export default router;
