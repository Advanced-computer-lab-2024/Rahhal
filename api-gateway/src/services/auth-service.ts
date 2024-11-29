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

export async function authenticate() {
    return await authAxiosInstance.get("/auth/authenticate");
}