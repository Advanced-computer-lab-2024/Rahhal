import axios from "axios";
import { SERVICES_URLS } from "@/lib/constants";
import type { IAutocompletePrediction, IPlaceDetails } from "@/features/home/types/home-page-types";

export async function fetchLocationDetails(location: { lat: number; lng: number }) {
  const { data } = await axios.get(SERVICES_URLS.GOOGLE_MAPS + "/place-details/location", {
    params: {
      latitude: location.lat,
      longitude: location.lng,
    },
  });
  return data;
}

//whoever wants to use this function without any filtering should pass the filter= ""
export const fetchSuggestions = async (query: string, filter: string) => {
  try {
    const { data } = await axios.get(`${SERVICES_URLS.GOOGLE_MAPS}/autocomplete`, {
      params: { input: query, filter: filter },
    });

    const suggestions = (data as IAutocompletePrediction[]).map((suggestion) => ({
      description: suggestion.description,
      placeId: suggestion.place_id,
    }));

    return suggestions;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};

export const fetchPlaceDetails = async (placeId: string) => {
  try {
    const { data } = await axios.get(`${SERVICES_URLS.GOOGLE_MAPS}/place-details`, {
      params: { placeId: placeId },
    });
    return {
      location: (data as IPlaceDetails).location,
      countryCode: (data as IPlaceDetails).countryCode,
    };
  } catch (error) {
    console.error("Error fetching place details:", error);
  }
};
