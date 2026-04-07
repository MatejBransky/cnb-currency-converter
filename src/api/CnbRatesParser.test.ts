import { expect, it } from "vitest";
import { CnbRatesParser } from "./CnbRatesParser";

it("parses valid exchange rates from CNB format", () => {
  const result = CnbRatesParser.parse(`23 Mar 2026 #57
Country|Currency|Amount|Code|Rate

Australia|dollar|1|AUD|14.796
Brazil|real|1|BRL|4.005
`);
  expect(result).toEqual({
    declaredAt: Temporal.PlainDate.from("2026-03-23"),
    rows: [
      {
        amount: 1,
        code: "AUD",
        country: "Australia",
        currency: "dollar",
        rate: 14.796,
      },
      {
        amount: 1,
        code: "BRL",
        country: "Brazil",
        currency: "real",
        rate: 4.005,
      },
    ],
  });
});

it("fails with wrong declaration date", () => {
  const result = CnbRatesParser.safeParse(`23 Wrong_month 2026 #57
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.796
Brazil|real|1|BRL|4.005
`);
  expect(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "date",
        "code": "invalid_type",
        "received": "Invalid Date",
        "path": [
          0
        ],
        "message": "Invalid input: expected date, received Date"
      }
    ]]
  `);
});

it("fails with unexpected headers", () => {
  const result = CnbRatesParser.safeParse(`23 Mar 2026 #57
currency|country|Amount|Code|Rate
Australia|dollar|1|AUD|14.796
Brazil|real|1|BRL|4.005
`);
  expect(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "invalid_value",
        "values": [
          "Country"
        ],
        "path": [
          1,
          0
        ],
        "message": "Invalid input: expected \\"Country\\""
      },
      {
        "code": "invalid_value",
        "values": [
          "Currency"
        ],
        "path": [
          1,
          1
        ],
        "message": "Invalid input: expected \\"Currency\\""
      }
    ]]
  `);
});

it("fails with wrong number format", () => {
  const result = CnbRatesParser.safeParse(`23 Mar 2026 #57
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|wrong_number
Brazil|real|1|BRL|4.005
  `);
  expect(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "number",
        "code": "invalid_type",
        "received": "NaN",
        "path": [
          2,
          "rate"
        ],
        "message": "Invalid input: expected number, received NaN"
      }
    ]]
  `);
});
