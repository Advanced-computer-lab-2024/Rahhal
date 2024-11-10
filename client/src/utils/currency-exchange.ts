import { CurrencyExchangeRate } from "@/api-calls/currency-exchange-api-calls";
import { useCurrencyStore, useRatesStore } from "@/stores/currency-exchange-store";

export default function currencyExchange(oldCurrency: string, oldPrice: number) {
  const { rates } = useRatesStore();
  const { currency } = useCurrencyStore();
  if (rates.rates) {
    const rateOfEURToOld = rates.rates[oldCurrency];
    const rateOfEURToNew = rates.rates[currency];
    const newPrice = (oldPrice * rateOfEURToNew) / rateOfEURToOld;
    return newPrice;
  }
}

export function currencyExchangeDefault(oldCurrency: string, oldPrice: number) {
  const { rates } = useRatesStore();
  if (rates.rates) {
    const rateOfEURToOld = rates.rates[oldCurrency];
    const rateOfEURToNew = rates.rates["EGP"];
    const newPrice = (oldPrice * rateOfEURToNew) / rateOfEURToOld;
    return newPrice;
  }
}

export function currencyExchangeSpec(oldCurrency: string, oldPrice: number,rates:CurrencyExchangeRate,currency:string) {
  if (rates.rates) {
    const rateOfEURToOld = rates.rates[oldCurrency];
    const rateOfEURToNew = rates.rates[currency];
    const newPrice = (oldPrice * rateOfEURToNew) / rateOfEURToOld;
    return newPrice;
  }
}

export function currencyExchangeDefaultSpec(oldCurrency: string, oldPrice: number,rates:CurrencyExchangeRate) {
  if (rates.rates) {
    const rateOfEURToOld = rates.rates[oldCurrency];
    const rateOfEURToNew = rates.rates["EGP"];
    const newPrice = (oldPrice * rateOfEURToNew) / rateOfEURToOld;
    return newPrice;
  }
}
