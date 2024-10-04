import axios from 'axios'
import { STATUS_CODES } from '@/utils/constants'

const axiosInstance = axios.create(
    {
        baseURL: "/users",
        validateStatus: (status) => {
            return status < STATUS_CODES.GATEWAY_TIMEOUT;
        }
    }
)

export async function getAllUsers() {
    return await axiosInstance.get("/");
}
export async function getUserById(id: string) {
    return await axiosInstance.get(`/${id}`);
}
export async function createUser(body: string) {
    return await axiosInstance.post("/", body);

}
export async function updateUser(id:string, body: string) {
    return await axiosInstance.patch(`/${id}`,body)
}
export async function deleteUser(id: string) {
    return await axiosInstance.delete(`/:${id}`);
}