import z from "zod";
import type { ExchangeRate } from "../../model/ExchangeRate";

const AmountInputSchema = z.codec(
  z.union([z.literal(""), z.coerce.number<string>()]).pipe(z.coerce.string()),
  z.number().optional(),
  {
    decode: (value) => (value === "" ? undefined : Number(value)),
    encode: (value) => (value === undefined ? "" : String(value)),
  },
);

const currencyFormatter = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function convertAmountToCurrency(
  amountString: string,
  exchangeRate: ExchangeRate,
) {
  const parsedResult = AmountInputSchema.safeDecode(amountString);

  if (parsedResult.error) {
    console.error("Parsing amount failed.", parsedResult.error.issues);
    return "--";
  }

  const amount = parsedResult.data ?? 0;

  return currencyFormatter.format(
    amount / (exchangeRate.rate / exchangeRate.amount),
  );
}
