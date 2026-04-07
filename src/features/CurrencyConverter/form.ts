import z from "zod";

export const AmountInputSchema = z.codec(
  z.union([z.literal(""), z.coerce.number<string>()]).pipe(z.coerce.string()),
  z.number().optional(),
  {
    decode: (value) => (value === "" ? undefined : Number(value)),
    encode: (value) => (value === undefined ? "" : String(value)),
  },
);
export type AmountInputSchema = z.input<typeof AmountInputSchema>;
export type Amount = z.infer<typeof AmountInputSchema>;

export function convertToCurrency({
  amount,
  rate,
}: {
  amount: number;
  rate: number;
}) {
  return Math.round((amount / rate) * 1000) / 1000;
}
