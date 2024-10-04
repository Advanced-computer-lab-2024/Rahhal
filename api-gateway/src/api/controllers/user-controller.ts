import type { Request, Response } from 'express'
import { STATUS_CODES } from "@/utils/constants";
import * as userService from "@/services/user-service";

export async function getAllUsers(req: Request, res: Response){
    try{
        const user = await userService.getAllUsers();
        res.status(user.status).json(user.data);
    }
    catch(error){
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function getUserById(req: Request, res: Response){
    try{
        const user = await userService.getUserById(req.params.id);
        res.status(user.status).json(user.data);
    }
    catch(error){
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function createUser(req: Request, res: Response){
    try{
        const user = await userService.createUser(req.body);
        res.status(user.status).json(user.data);
    }
    catch(error){
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function updateUser(req: Request, res: Response){
    try{
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(user.status).json(user.data);
    }
    catch(error){
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}

export async function deleteUser(req: Request, res: Response){
    try{
        const user = await userService.deleteUser(req.params.id);
        res.status(user.status).json(user.data);
    }
    catch(error){
        res.status(STATUS_CODES.GATEWAY_TIMEOUT).json(error);
    }
}