import type { TransferRequest } from "../interfaces/transferRequest";

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
  const amadeusTransferURL = process.env.AMADEUS_TRANSFER_URL;
  if (!amadeusTransferURL) {
    throw new Error("Missing Amadeus Transfer URL in .env file");
  }
  const accessToken = await getAccessToken();
  const response = await axios.post(amadeusTransferURL, request, {
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  });
  return response.data;
}
