import { delay, http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { fixture } from "../test/mocks/fixture";
import { worker } from "../test/mocks/worker";
import { App } from "./App";

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
    await expect
      .element(screen.getByTestId("exchange-rate-list"))
      .toBeVisible();
  });
});
