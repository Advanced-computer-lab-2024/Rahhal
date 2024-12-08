import type { Request, Response } from "express";
import { STATUS_CODES } from "@/utils/constants";
import * as promocodeService from "@/services/payment-services/promocode-service";

export async function getAllPromocodes(req: Request, res: Response) {
    try {
        const promocodes = await promocodeService.getAllPromocodes();
        res.status(promocodes.status).json(promocodes.data);
    } catch (error) {
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function createPromocode(req: Request, res: Response) {
    try {
        const promocode = await promocodeService.createPromocode(req.body);
        res.status(promocode.status).json(promocode.data);
    } catch (error) {
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function updatePromocode(req: Request, res: Response) {
    const promocodeId = req.params.id;
    try {
        const promocode = await promocodeService.updatePromocode(promocodeId, req.body);
        res.status(promocode.status).json(promocode.data);
    } catch (error) {
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function deletePromocode(req: Request, res: Response) {
    const promocodeId = req.params.id;
    try {
        const promocode = await promocodeService.deletePromocode(promocodeId);
        res.status(promocode.status).json(promocode.data);
    } catch (error) {
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function applyPromocode(req: Request, res: Response) {
    const userid = req.params.id;
    try {
        const promocode = await promocodeService.applyPromocode(userid, req.body);
        res.status(promocode.status).json(promocode.data);
    } catch (error) {
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function usePromocode(req: Request, res: Response) {
    const userid = req.params.id;
    try {
        const promocode = await promocodeService.usePromocode(userid, req.body);
        res.status(promocode.status).json(promocode.data);
    } catch (error) {
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}