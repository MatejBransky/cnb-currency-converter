import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { persister, queryClient } from "./api/client";
import { App } from "./app/App";

import "temporal-polyfill/global";
import "./api/queryMeta";

function main() {
  /**
   * INFO: Initializes cache hydration on app startup.
   *
   * Must be called before render() to ensure cached data is available immediately.
   * Without this, the first render would show loading state even if we have
   * valid cached rates from a previous session.
   */
  persistQueryClient({
    queryClient,
    persister,
  });

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

main();
