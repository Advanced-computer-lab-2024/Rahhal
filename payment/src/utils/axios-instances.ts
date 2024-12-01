import axios from "axios";
import { STATUS_CODES } from "@/utils/constants";
import { isSameDay, addDays, startOfDay, isWithinInterval } from "date-fns";

const userAxiosInstance = axios.create({
    baseURL: "http://user:3000",
    validateStatus: (status) => {
        return status < STATUS_CODES.GATEWAY_TIMEOUT;
    },
});

export async function isHisBirthday(id: string) {
    const response = await userAxiosInstance.get(`/users/${id}`);
    const today = startOfDay(new Date());
    const dob = startOfDay(new Date(response.data.dob));
    dob.setFullYear(today.getFullYear());
    const interval = {
        start: dob,
        end: addDays(dob, 7),
    };
    return isWithinInterval(today, interval);
}