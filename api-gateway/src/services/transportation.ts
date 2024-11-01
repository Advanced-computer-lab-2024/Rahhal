import type { TransferRequest } from "../interfaces/transferRequest";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getAccessToken() {
  const clientId = process.env.AMADEUS_API_KEY;
  const clientSecret = process.env.AMADEUS_API_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("AMADEUS_API_KEY and AMADEUS_API_SECRET must be defined");
  }

  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
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
