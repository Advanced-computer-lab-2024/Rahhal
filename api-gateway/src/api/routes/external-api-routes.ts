import express from "express";
import * as externalApiController from "@/api/controllers/external-api-controller";

const router = express.Router();

router.get("/tripadvisor", externalApiController.getTripAdvisorData);

export default router;