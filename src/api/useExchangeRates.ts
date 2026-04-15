import { useSuspenseQuery } from "@tanstack/react-query";
import { ExchangeRateFixing } from "../model/ExchangeRateFixing";
import { getExchangeRates } from "./getExchangeRates";
import { getTimeUntilNextUpdate } from "./queryPolicy";

export const useExchangeRates = () => {
  const query = useSuspenseQuery({
    queryKey: ["rates"],
    queryFn: getExchangeRates,
    meta: { persist: true },
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
    staleTime: (query) => {
      const data = query.state.data;
      if (!data) return 0;
      const ms = getTimeUntilNextUpdate(data);
      return ms ?? 0;
    },
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      const ms = getTimeUntilNextUpdate(data);
      return ms ?? false;
    },
    refetchOnMount: (query) => {
      const data = query?.state?.data;
      if (!data) return true;
      const ms = getTimeUntilNextUpdate(data);
      if (ms == null) return true;
      return ms <= 0;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
  });

  return {
    ...query,
    data: ExchangeRateFixing.decode(query.data),
  };
};
