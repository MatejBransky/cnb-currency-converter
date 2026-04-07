import z from "zod";
import { ExchangeRate } from "../model/ExchangeRate.ts";

const splitLines = (input: string) => input.split("\n");
const removeEmptyLines = (lines: string[]) =>
  lines.filter((line) => line.trim() !== "");
const splitCells = (row: string) => row.split("|");

const removeFixingCounter = (dateLine: string) => dateLine.split("#")[0].trim();
const DeclarationDate = z
  .string()
  .transform(removeFixingCounter)
  .pipe(z.coerce.date())
  .transform((d) =>
    d.toTemporalInstant().toZonedDateTimeISO("Europe/Prague").toPlainDate(),
  );

const ColumnHeaders = z
  .string()
  .transform(splitCells)
  .pipe(
    z.tuple([
      z.literal("Country"),
      z.literal("Currency"),
      z.literal("Amount"),
      z.literal("Code"),
      z.literal("Rate"),
    ]),
  );

const ExchangeRateRow = z
  .string()
  .transform(splitCells)
  .transform(([country, currency, amount, code, rate]) => ({
    country,
    currency,
    amount: Number(amount),
    code,
    rate: Number(rate),
  }))
  .pipe(ExchangeRate);

export const CnbRatesParser = z
  .string()
  .transform(splitLines)
  .transform(removeEmptyLines)
  .pipe(z.tuple([DeclarationDate, ColumnHeaders], ExchangeRateRow))
  .transform(([declarationDate, , ...rows]) => ({
    declaredAt: declarationDate,
    rows,
  }));
