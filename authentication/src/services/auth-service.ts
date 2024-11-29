import * as authRepository from "@/database/repositories/auth-repository"
import type { IAuthentication } from "@/database/models/Authentication";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { MAXAGE, Role } from "@/utils/constants";
import type { IPayload } from "@/type";
dotenv.config();

export async function login(username: string, password: string) {
    const user = await authRepository.getUser({username: username});
    if (user) {
        const correctPassword = await bcrypt.compare(password, user.password);
        if (correctPassword) {
            if(!user.approved){
                throw new Error("Pending Approval By Admin!");
            }
              
            const payload:IPayload = {
                id: user.id,
                username: user.username,
                role:user.role,
            }
            if(user.dob){
                payload.dob = user.dob;
            }
            const token = jwt.sign(payload,process.env.SECRETKEY!,{
                expiresIn : MAXAGE
            })
            return token;
        }
        else {
            throw new Error("Invalid Username/Password");
        }
    }
    else {
        throw new Error("Invalid Username/Password");
    }
}



export async function signup(userData: IAuthentication) {
    const salt = 10;
    
    const pass = userData.password;
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    const user =  await authRepository.createUser(userData);
    if(user.role === Role.tourist){
        return login(user.username , pass);
    }
}

export async function changePassword(userId:string , oldPassword:string , newPassword:string){
    const user = await authRepository.getUserById(userId);
    if(user){
        const correctPassword = await bcrypt.compare(oldPassword, user.password);
        if(correctPassword){
            const salt = 10;
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            return await authRepository.updateUser(userId , {password : hashedPassword});
        }
        else{
            throw new Error("Incorrect Old Password");
        }
    }
    else{
        throw new Error("User Not Found");
    }
}

export async function approveUser(userId:string , approved:boolean){
    return await authRepository.updateUser(userId , {approved });
}

export async function deleteUser(userId:string){
    return await authRepository.deleteUser(userId);
}