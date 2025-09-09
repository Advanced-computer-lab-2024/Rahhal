import dotenv from "dotenv";
import { exchangeratesAxiosInstance } from "@/utils/axios-instances";
import { BACKUP_EXCHANGE_RATES } from "@/utils/constants";

dotenv.config();

const EXCHANGE_RATES_API_KEY = process.env.EXCHANGE_RATES_API_KEY;

export async function getLatestExchangeRates() {
  const { data } = await exchangeratesAxiosInstance.get(
    `/${EXCHANGE_RATES_API_KEY}/latest/EUR`,
  );

  const date = new Date();
  const rates = (data.result == "success") ? data.conversion_rates : BACKUP_EXCHANGE_RATES;

  return {
    date: date,
    rates: rates,
  };
}
