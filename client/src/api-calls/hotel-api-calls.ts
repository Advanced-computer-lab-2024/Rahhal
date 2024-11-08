import { SERVICES_URLS } from "@/lib/constants";

export const fetchActivities = async () => {
    const response = await axios.get(SERVICES_URLS.EXTERNALAPI + `/tripadvisor`);
    return response.data;
};