import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { fixture } from "../../test/mocks/fixture";
import { ExchangeRateList } from "./ExchangeRateList";

describe("<ExchangeRateList />", () => {
  it("renders basic rate info", async () => {
    const screen = await render(<ExchangeRateList items={fixture.rows} />);

    const [headRowGroup, bodyRowGroup] = screen.getByRole("rowgroup").all();
    const [currencyColumn, rateColumn] = headRowGroup
      .getByRole("cell")
      .elements();

    await expect.element(currencyColumn).toHaveTextContent("Currency");
    await expect.element(rateColumn).toHaveTextContent("Rate");

    const firstRow = bodyRowGroup.getByRole("row").first();
    const [currencyCell, rateCell] = firstRow.getByRole("cell").elements();

    await expect.element(currencyCell).toHaveTextContent("Australia - dollar");
    await expect.element(rateCell).toHaveTextContent("1 AUD = 14.796 CZK");
  });
});
