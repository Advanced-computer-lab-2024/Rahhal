import type { Request, Response } from "express";
import * as externalApiServices from "@/services/external-api-service"; 
import { STATUS_CODES } from "@/utils/constants";

export async function getTripAdvisorData(req: Request, res: Response) {
    try {
        const { q } = req.query;
        const response = await externalApiServices.getTripAdvisorData(q as string);
        res.status(STATUS_CODES.STATUS_OK).json(response);
    }
    catch (error) {
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}
