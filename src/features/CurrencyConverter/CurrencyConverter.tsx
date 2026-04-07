import { useState } from "react";
import { useExchangeRates } from "../../api/useExchangeRates";
import { AmountInputSchema, convertToCurrency } from "./form";
import * as S from "./CurrencyConverter.styles";

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
    <S.Form>
      <S.Fieldset>
        <legend>From</legend>

        <S.Field $area="amount">
          <S.Label htmlFor="from-amount">Amount</S.Label>
          <S.Input
            id="from-amount"
            name="amount"
            placeholder="Enter amount"
            value={state.amount}
            onChange={(event) =>
              setState((prev) => ({ ...prev, amount: event.target.value }))
            }
            aria-describedby="from-amount-meta"
          />
        </S.Field>

        <S.Field $area="currency">
          <S.Label as="span" id="from-currency-label">
            Currency
          </S.Label>
          <S.Output aria-labelledby="from-currency-label">CZK</S.Output>
        </S.Field>

        <S.Description id="from-amount-meta">Czechia - koruna</S.Description>
      </S.Fieldset>

      <S.Fieldset>
        <legend>To</legend>

        <S.Field $area="amount">
          <S.Label htmlFor="to-amount">Amount</S.Label>
          <S.Output
            id="to-amount"
            aria-live="polite"
            aria-describedby="to-amount-meta"
          >
            {result}
          </S.Output>
        </S.Field>

        <S.Field $area="currency">
          <S.Label htmlFor="to-currency">Currency</S.Label>
          <S.Select
            id="to-currency"
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
          </S.Select>
        </S.Field>

        <S.Description id="to-amount-meta">
          {exchangeRate.country} - {exchangeRate.currency}
        </S.Description>
      </S.Fieldset>

      <S.ExchangeRateMeta>
        <span>
          Exchange rate
          <mark>
            {exchangeRate.amount} {exchangeRate.code} = {exchangeRate.rate} CZK
          </mark>
        </span>

        <time title="Exchange rate last update">
          {data.declaredAt.toLocaleString("en-US")}
        </time>
      </S.ExchangeRateMeta>
    </S.Form>
  );
};
