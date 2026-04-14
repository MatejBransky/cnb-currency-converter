import { ExchangeRateFixing } from "../model/ExchangeRateFixing";

export async function getExchangeRates() {
  const res = await fetch("/rates");
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  const json = await res.json();
  return ExchangeRateFixing.decode(json);
}
