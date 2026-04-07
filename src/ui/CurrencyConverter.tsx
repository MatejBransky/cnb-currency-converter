import { useSuspenseQuery } from "@tanstack/react-query";
import { getExchangeRates } from "../api/getExchangeRates";

export const CurrencyConverter = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["rates"],
    queryFn: getExchangeRates,
  });
  return (
    <>
      <h2>Data</h2>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
};
