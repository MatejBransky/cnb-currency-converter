import { useState } from "react";
import { useExchangeRates } from "../../api/useExchangeRates";
import { AmountInputSchema, convertToCurrency } from "./form";

export const CurrencyConverter = () => {
  const { data } = useExchangeRates();
  const [state, setState] = useState({
    amount: "",
    currency: "USD",
  });

  const exchangeRate = data.rows.find((item) => item.code === state.currency);

  if (!exchangeRate) {
    console.error("Loaded exchange rates: ", data);
    console.error("Selected currency: ", state.currency);
    throw new Error("The exchange rate for the selected currency wasn't found");
  }

  const decodedAmountResult = AmountInputSchema.safeDecode(state.amount);

  const result = decodedAmountResult.data
    ? convertToCurrency({
        amount: decodedAmountResult.data,
        rate: exchangeRate.rate / exchangeRate.amount,
      })
    : "--";

  return (
    <form>
      <label>
        Amount
        <input
          name="amount"
          value={state.amount}
          onChange={(event) =>
            setState((prev) => ({ ...prev, amount: event.target.value }))
          }
        />
      </label>

      <label>
        Currency
        <select
          name="currency"
          value={state.currency}
          onChange={(event) =>
            setState((prev) => ({ ...prev, currency: event.target.value }))
          }
        >
          {data.rows.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </select>
      </label>

      <label>
        Result
        <output>{result}</output>
      </label>
    </form>
  );
};
