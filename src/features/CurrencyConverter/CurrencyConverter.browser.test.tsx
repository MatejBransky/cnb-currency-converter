import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { TestProviders } from "../../test/TestProviders";
import { CurrencyConverter } from "./CurrencyConverter";

describe("<CurrencyConverter />", () => {
  it("converts amount to the selected currency", async () => {
    const screen = await render(
      <TestProviders>
        <CurrencyConverter />
      </TestProviders>,
    );

    await screen.getByLabelText("Amount").fill("10");
    await screen.getByLabelText("Currency").selectOptions(["AUD"]);
    await expect
      .element(screen.getByLabelText("Result"))
      .toHaveTextContent("0.676");
  });
});
