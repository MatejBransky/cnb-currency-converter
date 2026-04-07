import { defineConfig } from "vitest/config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { playwright } from "@vitest/browser-playwright";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  test: {
    projects: [
      {
        test: {
          include: ["**/*.{test,spec}.ts"],
          includeSource: ["src/**/*.ts"],
          name: "unit",
          environment: "node",
          setupFiles: ["./src/test/test-setup.ts"],
        },
      },
      {
        test: {
          include: ["**/*.{browser,smoke}.{test,spec}.tsx"],
          name: "browser",
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./src/test/test-setup.browser.ts"],
        },
      },
    ],
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
