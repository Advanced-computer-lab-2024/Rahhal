import { HotelDetails } from "@/features/home/types/home-page-types";
import { SERVICES_URLS } from "@/lib/constants";

export async function fetchHotels(name : string) : Promise<HotelDetails[]> {
    const response = await axios.get(SERVICES_URLS.EXTERNALAPI + `/tripadvisor?q=${name}`);
    return response.data as HotelDetails[];
};