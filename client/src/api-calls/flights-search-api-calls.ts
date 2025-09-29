import type {
  FlightData,
  FlightRequest,
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
  flightReq: FlightRequest
): Promise<FlightData> => {
  const erroredDataPlaceHolder = {
    data: [],
    dictionaries: { carriers: {} },
    meta: { count: 0 },
  };
  try {
    const { data } = await axios.post(`${SERVICES_URLS.FLIGHTS}`, flightReq);
    if (isErrorResponse(data)) {
      console.error("Error fetching flight", data.errors);
      return erroredDataPlaceHolder;
    }
    return data as FlightData;
  } catch (error) {
    console.error("Error fetching flight", error);
    return erroredDataPlaceHolder;
  }
};
