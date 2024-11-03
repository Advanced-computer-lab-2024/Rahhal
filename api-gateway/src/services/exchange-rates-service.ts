import dotenv from "dotenv";
import { exchangeratesAxiosInstance } from "@/utils/axios-instances"

dotenv.config();

const EXCHANGE_RATES_API_KEY = process.env.EXCHANGE_RATES_API_KEY;

export async function getLatestExchangeRates() {
  const { data } = await exchangeratesAxiosInstance.get(`/latest?access_key=${EXCHANGE_RATES_API_KEY}`);

  const date = data.date;
  const rates = data.rates;

  return {
    date: date,
    rates: rates
  };
}
