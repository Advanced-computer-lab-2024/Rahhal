import type {
  IAutocompletePrediction,
  TransferRequest,
  AirportResponse,
  IPlaceDetails,
} from "@/features/home/types/home-page-types";
import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

export const getTransportation = async (transferReq: TransferRequest) => {
  try {
    const { data } = await axios.post(`${SERVICES_URLS.TRANSPORTATION}`, transferReq);
    return data;
  } catch (error) {
    console.error("Error fetching transportation:", error);
  }
};

export const getAirportCode = async (longitude: number, latitude: number) => {
  try {
    const { data } = await axios.get(`${SERVICES_URLS.TRANSPORTATION}/airport-code`, {
      params: { longitude: longitude, latitude: latitude },
    });
    return (data as AirportResponse).data[0].iataCode;
  } catch (error) {
    console.error("Error fetching airport code:", error);
  }
};

export const fetchSuggestions = async (query: string) => {
  try {
    const { data } = await axios.get(`${SERVICES_URLS.GOOGLE_MAPS}/autocomplete`, {
      params: { input: query, filter: "establishment" },
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
