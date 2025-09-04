import type { Request, Response, NextFunction } from "express";
import { CONSTANTS, STATUS_CODES } from "@/utils/constants";
import * as authService from "@/services/auth-service"


export async function login(req: Request, res: Response) {
    try {
        const authbody = req.body;
        const cookie = await authService.login(authbody);
        // console.log(cookie.data);
        if (cookie.status === STATUS_CODES.STATUS_OK) {
            res.cookie("jwt", cookie.data, {
                secure: true,         // required for SameSite=None
                sameSite: "none",
                httpOnly: true,
                maxAge: CONSTANTS.MAXAGE 
            });
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
        const response = await authService.changePassword(authbody)
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}

export async function approveUser(req: Request, res: Response) {
    try {
        const userId = req.body.id;
        const response = await authService.approveUser(userId);
        res.status(response.status).json(response.data);
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

export async function forgotPassword(req: Request, res: Response) {
    try{
        const {username} = req.body;
        const response = await authService.forgotPassword({username});
        res.status(response.status).json(response.data);

    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}

export async function resetPassword(req: Request, res: Response) {
    try{
        const {username, password} = req.body;
        const response = await authService.resetPassword({username, password});
        res.status(response.status).json(response.data);
    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}

export async function verifyOTP(req: Request, res: Response) {
    try{
        const {username, otp} = req.body;
        const response = await authService.verifyOTP({username, otp});
        res.status(response.status).json(response.data);
    }
    catch (error:unknown) {
        if (error instanceof Error) {
            res.status(STATUS_CODES.BAD_GATEWAY).json(error.message);
        }
    }
}
