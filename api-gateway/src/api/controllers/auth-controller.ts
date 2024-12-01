import type { Request, Response, NextFunction } from "express";
import { CONSTANTS, STATUS_CODES } from "@/utils/constants";
import * as authService from "@/services/auth-service"


export async function login(req: Request, res: Response) {
    try {
        const authbody = req.body;
        const cookie = await authService.login(authbody);
        console.log(cookie);
        if (cookie.status === STATUS_CODES.STATUS_OK) {
            res.cookie("jwt", cookie.data, { httpOnly: true,sameSite:'strict' , path: '/' ,  maxAge: CONSTANTS.MAXAGE });
            res.status(STATUS_CODES.STATUS_OK).json();
        }
        else {
            res.status(STATUS_CODES.SERVER_ERROR).json({ error: cookie.data.error });
        }
    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}


export async function changePassword(req: Request, res: Response) {
    try {
        const authbody = req.body;
        await authService.changePassword(authbody)
        res.status(STATUS_CODES.STATUS_OK).json();
    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}

export async function approveUser(req: Request, res: Response) {
    try {
        const userId = req.body.id;
        await authService.approveUser(userId);
        res.status(STATUS_CODES.STATUS_OK).json();
    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}

export async function authStateMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.jwt;
        if (token) {
            const verification = await authService.verify(token);
            if (verification.status === STATUS_CODES.STATUS_OK) {
                res.locals = verification.data;
            }
            else {
                res.locals = {
                    role: "guest"
                }
            }
        }
        else {
            res.locals = {
                role: "guest"
            }
        }
        next();
    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }

}
