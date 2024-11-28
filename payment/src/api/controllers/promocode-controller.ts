import type { Request, Response } from "express";
import { STATUS_CODES, ERROR_MESSAGES } from "@/utils/constants";
import * as promocodeService from "@/services/promocode-service";
import { IPromocode } from "@/utils/types";
import e from "express";

export async function getAllPromocodes(req: Request, res: Response) {
    try {
        const promocodes = await promocodeService.getAllPromocodes();
        res.status(STATUS_CODES.STATUS_OK).json(promocodes);
    } catch (error) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
}

export async function createPromocode(req: Request, res: Response) {
    try {
        const promocode: IPromocode = req.body;
        const newPromocode = await promocodeService.createPromocode(promocode);
        res.status(STATUS_CODES.CREATED).json(newPromocode);
    } catch (error) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
}

export async function updatePromocode(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const promocode: Partial<IPromocode> = req.body;
        const updatedPromocode = await promocodeService.updatePromocode(id, promocode);
        res.status(STATUS_CODES.STATUS_OK).json(updatedPromocode);
    } catch (error) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
}

export async function deletePromocode(req: Request, res: Response) {
    try {
        const id = req.params.id;
        await promocodeService.deletePromocode(id);
        res.status(STATUS_CODES.STATUS_OK).json({ message: "Promocode deleted" });
    } catch (error) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
}

export async function validatePromocode(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const code = req.body.code;
        const promocode = await promocodeService.validatePromocode(id, code);
        res.status(STATUS_CODES.STATUS_OK).json(promocode);
    } catch (error: any) {
        res.status(STATUS_CODES.SERVER_ERROR).json({ message: error.message });
    }
}

