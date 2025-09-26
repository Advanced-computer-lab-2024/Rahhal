import type {
  TransferRequest,
  AirportResponse,
  TransportationData,
} from "@/features/home/types/home-page-types";
import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

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
  transferReq: TransferRequest
): Promise<TransportationData> => {
  const { data } = await axios.post(
    `${SERVICES_URLS.TRANSPORTATION}`,
    transferReq
  );
  if (isErrorResponse(data)) {
    console.error("Error fetching transportation:", data.errors);
    return { data: [] };
  }
  return data as TransportationData;
};

export const getAirportCode = async (longitude: number, latitude: number) => {
  try {
    const { data } = await axios.get(
      `${SERVICES_URLS.TRANSPORTATION}/airport-code`,
      {
        params: { longitude: longitude, latitude: latitude },
      }
    );
    const response = data as AirportResponse;
    return response.data.length != 0 ? response.data[0].iataCode : "";
  } catch (error) {
    console.error("Error fetching airport code:", error);
  }
};
