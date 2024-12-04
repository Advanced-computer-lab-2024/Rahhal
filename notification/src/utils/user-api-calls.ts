import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";
import { IUser } from "./types";

const userAxiosInstance = axios.create({
  baseURL: "http://user:3000",
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
