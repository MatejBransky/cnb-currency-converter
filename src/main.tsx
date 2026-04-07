import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

import "temporal-polyfill/global";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
