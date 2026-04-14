import { useSuspenseQuery } from "@tanstack/react-query";
import { ExchangeRateFixing } from "../model/ExchangeRateFixing";
import { getExchangeRates } from "./getExchangeRates";

export const useExchangeRates = () => {
  return useSuspenseQuery({
    queryKey: ["rates"],
    queryFn: getExchangeRates,
    networkMode: "offlineFirst",
    staleTime: (query) => {
      if (!query.state.data) return 0;
      const result = ExchangeRateFixing.safeParse(query.state.data);
      if (result.error) return 0;
      const { data } = result;
      const next = data.meta.nextUpdateAt;

      const now = Temporal.Now.instant();
      const diffMs = next.since(now).total("milliseconds");
      console.log("diffMs", next.since(now).total("hours"));
      return Math.max(diffMs, 0);
    },
  });
};
