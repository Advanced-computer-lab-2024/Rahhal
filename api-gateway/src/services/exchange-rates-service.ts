import dotenv from "dotenv";
import { exchangeratesAxiosInstance } from "@/utils/axios-instances";
import { BACKUP_EXCHANGE_RATES } from "@/utils/constants";

dotenv.config();

const EXCHANGE_RATES_API_KEY = process.env.EXCHANGE_RATES_API_KEY;

export async function getLatestExchangeRates() {
  let rates = BACKUP_EXCHANGE_RATES;

  try {
    const { data } = await exchangeratesAxiosInstance.get(
      `/${EXCHANGE_RATES_API_KEY}/latest/EUR`,
    );

    if (data && data.result === "success") {
      rates = data.conversion_rates;
    }
  } catch (error : unknown) {
    if (error instanceof Error) {
      console.error("Failed to fetch exchange rates:", error.message);
    }
  }

  const date = new Date();

  return {
    date: date,
    rates: rates,
  };
}
