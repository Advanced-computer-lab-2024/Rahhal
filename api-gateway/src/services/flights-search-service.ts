import axios from "axios";
import * as amadeusApi from "@/utils/amadeus-api";
import type { FlightSearchRequest } from "../interfaces/flight-search-request";

export async function getFlightOffers(request: FlightSearchRequest) {
  const accessToken = await amadeusApi.getAccessToken();
  const { data } = await axios.post("https://test.api.amadeus.com/v2/shopping/flight-offers", request, {
    headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" },
  });
  return data;
}
