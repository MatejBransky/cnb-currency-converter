import type { ExchangeRateFixing } from "../../model/ExchangeRateFixing";

export const fixture: ExchangeRateFixing = {
  declaredAt: Temporal.PlainDate.from("2026-04-07"),
  rows: [
    {
      country: "Australia",
      currency: "dollar",
      amount: 1,
      code: "AUD",
      rate: 14.796,
    },
    {
      country: "USA",
      currency: "dollar",
      amount: 1,
      code: "USD",
      rate: 21.333,
    },
  ],
};
