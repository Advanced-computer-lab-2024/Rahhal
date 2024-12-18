import {
    authAxiosInstance
} from '@/utils/axios-instances';
import type { IPayload } from '@/utils/types';

export async function login(body: Partial<IPayload>) {
    return await authAxiosInstance.post("/auth/login", body);
}

export async function signup(body: IPayload) {
    return await authAxiosInstance.post("/auth/signup", body);
}

export async function logout() {
    return await authAxiosInstance.post("/auth/logout");
}

export async function changePassword(body: Partial<IPayload>) {
    return await authAxiosInstance.patch("/auth/changepassword", body);
}

export async function approveUser(body: string) {
    return await authAxiosInstance.patch("/auth/", body);
}

export async function verify(token: string) {
    return await authAxiosInstance.get(`/auth/verify/${token}`);
}

export async function deleteAccount(userId: string) {
    return await authAxiosInstance.delete(`/auth/${userId}`);
} 

export async function forgotPassword(body: Partial<IPayload>) {
    return await authAxiosInstance.post("/auth/forgotpassword", body);
}

export async function resetPassword(body: Partial<IPayload>) {
    return await authAxiosInstance.patch("/auth/resetpassword", body);
}

export async function verifyOTP(body: Partial<IPayload>) {
    const response =  await authAxiosInstance.patch("/auth/verifyOTP", body);   
    console.log(response);
    return response;
}