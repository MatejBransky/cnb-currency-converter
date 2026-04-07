import { useSuspenseQuery } from "@tanstack/react-query";
import { getExchangeRates } from "./getExchangeRates";

export const useExchangeRates = () => {
  return useSuspenseQuery({ queryKey: ["rates"], queryFn: getExchangeRates });
};
