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
