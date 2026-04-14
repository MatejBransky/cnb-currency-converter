import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

import "temporal-polyfill/global";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { persister, queryClient } from "./api/client";

await persistQueryClient({
  queryClient,
  persister,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
