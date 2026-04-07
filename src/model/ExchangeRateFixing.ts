import z from "zod";
import { ExchangeRate } from "./ExchangeRate";

export const ExchangeRateFixing = z.object({
  declaredAt: z.union([
    z.string().transform((d) => Temporal.PlainDate.from(d)),
    z.instanceof(Temporal.PlainDate),
  ]),
  rows: z.array(ExchangeRate),
});
export type ExchangeRateFixing = z.infer<typeof ExchangeRateFixing>;
