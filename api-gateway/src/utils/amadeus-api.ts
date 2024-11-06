import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export async function getAccessToken() {
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

  console.log("Amadeus API Access Token: ", response.data.access_token);
  return response.data.access_token;
}
