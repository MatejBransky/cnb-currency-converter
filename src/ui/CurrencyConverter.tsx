import { useSuspenseQuery } from "@tanstack/react-query";
import { getExchangeRates } from "../api/getExchangeRates";
import { ExchangeRateList } from "./ExchangeRateList/ExchangeRateList";

export const CurrencyConverter = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["rates"],
    queryFn: getExchangeRates,
  });
  return (
    <>
      <ExchangeRateList items={data.rows} />
    </>
  );
};
