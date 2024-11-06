import { SERVICES_URLS } from "@/lib/constants";
import axios from "axios";

export interface CurrencyExchangeRate {
    date: Date;
    rates: {
        [key: string]: number;
    };
}

export async function getCurrencyExchangeRates() : Promise<CurrencyExchangeRate> {
    const res = await axios.get(SERVICES_URLS.EXCHANGERATES + "/latest");
    return res.data;
}