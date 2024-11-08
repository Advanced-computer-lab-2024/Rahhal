import type {
  FlightData,
  FlightRequest
} from "@/features/home/types/home-page-types";
import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

//TODO:repeated from transportation-api-calls.ts -> to be moved to a common file
interface ErrorResponse {
  errors: {
    code: number;
    detail: string;
  }[];
}
const isErrorResponse = (data: any): data is ErrorResponse => {
  return data && typeof data === "object" && "errors" in data;
};

export const getFlights = async (
  flightReq: FlightRequest,
): Promise<FlightData> => {
  const {data} = await axios.post(`${SERVICES_URLS.FLIGHTS}`, flightReq);
  if (isErrorResponse(data)) {
    console.error("Error details:", data.errors);
    alert(`Error: ${data.errors[0].detail}`);
    return { data: [], dictionaries: { carriers: {} }, meta: { count: 0 } };
  }
  return data as FlightData;
};
