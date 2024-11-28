import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";
import { isSameDay } from "date-fns";

const userAxiosInstance = axios.create({
    baseURL: "http://user:3000",
    validateStatus: (status) => {
        return status < STATUS_CODES.GATEWAY_TIMEOUT;
    },
});

export async function isHisBirthday(id: string) {
    const response = await userAxiosInstance.get(`/users/${id}`);
    return isSameDay(new Date(response.data.dob), new Date());
}