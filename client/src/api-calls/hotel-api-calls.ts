import { SERVICES_URLS } from "@/lib/constants";

export const fetchHotels = async (name : string) => {
    const response = await axios.get(SERVICES_URLS.EXTERNALAPI + `/tripadvisor?q=${name}`);
    return response.data;
};