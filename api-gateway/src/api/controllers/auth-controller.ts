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
                sameSite:'lax' , 
                 
                maxAge: CONSTANTS.MAXAGE 
            });
            // const token = cookie.data;
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

export async function forgotPassword(req: Request, res: Response) {
    try{
        const {username} = req.body;
        await authService.forgotPassword({username});
        res.status(STATUS_CODES.STATUS_OK).json();

    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}

export async function resetPassword(req: Request, res: Response) {
    try{
        const {username, password} = req.body;
        await authService.resetPassword({username, password});
        res.status(STATUS_CODES.STATUS_OK).json();
    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}

export async function verifyOTP(req: Request, res: Response) {
    try{
        const {username, otp} = req.body;
        await authService.verifyOTP({username, otp});
        res.status(STATUS_CODES.STATUS_OK).json();
    }
    catch (error) {
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
}
