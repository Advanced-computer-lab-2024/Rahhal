import { IHotelDetails } from "@/features/home/types/home-page-types";
import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

export async function fetchHotels(name : string) : Promise<IHotelDetails[]> {
    const response = await axios.get(SERVICES_URLS.EXTERNALAPI + `/tripadvisor?q=${name}`);
    return response.data as IHotelDetails[];
};