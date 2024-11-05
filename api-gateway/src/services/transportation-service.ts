import type { TransferRequest } from "@/utils/types";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getAccessToken() {
  const clientId = process.env.AMADEUS_API_KEY;
  const clientSecret = process.env.AMADEUS_API_SECRET;
  const amadeusAuthURL = process.env.AMADEUS_AUTH_URL;

  if (!clientId || !clientSecret || !amadeusAuthURL) {
    throw new Error("Missing Amadeus APIs in .env file");
  }

  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await axios.post(
    amadeusAuthURL,
    data.toString(), // Pass data as a URL-encoded string
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  return response.data.access_token;
}

export async function getTransportationOffers(request: TransferRequest) {
  const accessToken = await getAccessToken();
  const response = await axios.post(
    "https://test.api.amadeus.com/v1/shopping/transfer-offers",
    request,
    {
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    },
  );
  return response.data;
}

export async function getAirportCodes(longitude: number, latitude: number) {
  const accessToken = await getAccessToken();
  const response = await axios.get(
    "https://test.api.amadeus.com/v1/reference-data/locations/airports",
    {
      params: { longitude: longitude, latitude: latitude, radius: 10 },
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );
  return response.data;
}
