import express from "express";
import * as externalAPIsService from "@/api/controllers/external-api-controller";

const router = express.Router();

router.get("/getGoBusAPI", externalAPIsService.getGoBusAPI);

export default router;