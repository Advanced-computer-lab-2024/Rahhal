import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";
import { IUser } from "./types";
import dotenv from "dotenv";

dotenv.config();

const userAxiosInstance = axios.create({
  baseURL: process.env.USER_SERVICE_URL || "http://user:3000",
  validateStatus: (status) => {
    return status < STATUS_CODES.GATEWAY_TIMEOUT;
  },
});

export async function getUserById(id: string): Promise<IUser> {
  return (await userAxiosInstance.get(`/users/${id}`)).data;
}

export async function getAdmins(): Promise<IUser[]> {
  return (await userAxiosInstance.get('/users?approved=true')).data.filter((user: IUser) => user.role === 'admin');
}
