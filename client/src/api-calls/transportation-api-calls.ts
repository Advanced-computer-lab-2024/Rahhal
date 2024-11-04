import type {
  IAutocompletePrediction,
  TransferRequest,
  AirportResponse,
  IPlaceDetails,
  TransportationData,
} from "@/features/home/types/home-page-types";
import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

const handleAxiosError = (error: unknown) => {
  // if (axios.isAxiosError(error) && error.response) {
  //   alert(error.response.data.error);
  //   console.error("Server error response:", error.response.data);
  // }
};
interface ErrorResponse {
  errors: {
    code: number;
    detail: string;
  }[];
}
const isErrorResponse = (data: any): data is ErrorResponse => {
  return data && typeof data === "object" && "errors" in data;
};

export const getTransportation = async (
  transferReq: TransferRequest,
): Promise<TransportationData> => {
  const { data } = await axios.post(`${SERVICES_URLS.TRANSPORTATION}`, transferReq);
  if (isErrorResponse(data)) {
    console.error("Error details:", data.errors);
    alert(`Error: ${data.errors[0].detail}`);
    return { data: [] };
  }
  return data as TransportationData;
};

export const getAirportCode = async (longitude: number, latitude: number) => {
  try {
    const { data } = await axios.get(`${SERVICES_URLS.TRANSPORTATION}/airport-code`, {
      params: { longitude: longitude, latitude: latitude },
    });
    const response = data as AirportResponse;
    return response.data.length != 0 ? response.data[0].iataCode : "";
  } catch (error) {
    handleAxiosError(error);
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
    handleAxiosError(error);
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
    handleAxiosError(error);
    console.error("Error fetching place details:", error);
  }
};
