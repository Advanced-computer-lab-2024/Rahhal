import { create } from 'zustand'
import {CurrencyExchangeRate, getCurrencyExchangeRates} from '@/api-calls/currency-exchange-api-calls'

interface RateStore {
    rates: CurrencyExchangeRate,
    setRates: (newRates: CurrencyExchangeRate) => void
}

interface CurrencyStore {
  currency: string
  setCurrency: (newCurrency: string) => void
}

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currency: 'EGP', 
  setCurrency: (newCurrency) => set({ currency: newCurrency }),
}))

export const useRatesStore = create<RateStore>((set) => ({
    rates: {} as CurrencyExchangeRate,
    setRates: (newRates) => set({ rates: newRates }),
}))
