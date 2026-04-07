import { delay, http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import type { ExchangeRateFixing } from "../model/ExchangeRateFixing";
import { worker } from "../test/mocks/worker";
import { App } from "./App";

const fixture: ExchangeRateFixing = {
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

describe("<App />", () => {
  test("Loading state", async () => {
    worker.use(
      http.get("/rates", async () => {
        await delay(1000);
        return HttpResponse.json(fixture);
      }),
    );

    const screen = await render(<App />);
    await expect.element(screen.getByText("Loading...")).toBeVisible();
  });

  test("Error boundary", async () => {
    worker.use(http.get("/rates", () => HttpResponse.error()));

    const screen = await render(<App />);
    await expect
      .element(screen.getByText("Something went wrong"))
      .toBeVisible();
  });

  test("Successful fetch", async () => {
    worker.use(http.get("/rates", () => HttpResponse.json(fixture)));

    const screen = await render(<App />);
    await expect.element(screen.getByText("Data")).toBeVisible();
  });
});
