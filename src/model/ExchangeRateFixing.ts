import z from "zod";
import { ExchangeRate } from "./ExchangeRate.ts";
import {
  TemporalDuration,
  TemporalInstant,
  TemporalPlainDate,
} from "./Temporal.ts";

export const ExchangeRateFixing = z.object({
  meta: z.object({
    nextUpdateAt: TemporalInstant,
    cacheTtl: TemporalDuration,
  }),
  declaredAt: TemporalPlainDate,
  rows: z.array(ExchangeRate),
});
export type ExchangeRateFixing = z.infer<typeof ExchangeRateFixing>;
