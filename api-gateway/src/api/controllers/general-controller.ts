import { CONSTANTS, STATUS_CODES } from "@/utils/constants";
import * as generalService from '@/services/general-service'; 
import type { Request, Response } from "express";


export async function signup(req: Request, res: Response) {
    try {
        const userData = req.body ;
        const cookie = await generalService.signup(userData);
        if(cookie){
            res.cookie("jwt",cookie , {httpOnly:true , maxAge: CONSTANTS.MAXAGE});
        }
        res.status(STATUS_CODES.CREATED).json();
    } catch (error) {
        if(error instanceof Error){
            res.status(STATUS_CODES.BAD_GATEWAY).json({error : error.message});
        }
    }
};

export async function logout(req:Request , res: Response){
    try{
        res.cookie("jwt" , ' ' , {
            httpOnly: true , 
            sameSite:'lax' , 
            maxAge:1
        });
        res.status(STATUS_CODES.STATUS_OK).json();
    }
    catch(error){
        res.status(STATUS_CODES.BAD_GATEWAY).json(error);
    }
};