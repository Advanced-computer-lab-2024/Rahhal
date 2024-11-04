import axios from 'axios';
import { SERVICES_URLS } from "@/lib/constants";

export async function fetchLocationDetails(location: { lat: number; lng: number }) {
    const { data } = await axios.get(SERVICES_URLS.GOOGLEMAP+"/place-details/location", {
        params: {
            latitude: location.lat,
            longitude: location.lng,
        }
    });
    return data;
}
