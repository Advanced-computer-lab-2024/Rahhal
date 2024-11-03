import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {CurrencyExchangeRate , getCurrencyExchangeRates} 
from "@/api-calls/currency-exchange-api-calls";

interface CurrencyExchangeRateState {
    currencyRates: CurrencyExchangeRate;
    setCurrencyRates: () => Promise<void>;
  }

export const useCurrencyRateStore = create(
persist<CurrencyExchangeRateState>(
    (set) => ({
        currencyRates: {} as CurrencyExchangeRate,
        setCurrencyRates: async() => {
            try {
            const data = await getCurrencyExchangeRates();
            set({ currencyRates: data });
            }
            catch (error) {
                console.error("Failed to fetch currency exchange rates:", error);
            }
        }
    }),
    {
        name: "currencyExchangeRates",
        storage: createJSONStorage(() => localStorage),
    },
)
)