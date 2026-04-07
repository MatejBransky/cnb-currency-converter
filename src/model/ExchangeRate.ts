import z from "zod";

export const ExchangeRate = z.object({
  country: z.string(),
  currency: z.string(),
  amount: z.number(),
  code: z.string(),
  rate: z.number(),
});
export type ExchangeRate = z.infer<typeof ExchangeRate>;
