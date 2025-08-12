import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setupTests.js"],
    css: false,
    coverage: {
      provider: "v8", // uses @vitest/coverage-v8
      reporter: ["text", "lcov"],
      reportsDirectory: "./coverage",
      include: ["**/*.{js,jsx}"],
      exclude: ["**/node_modules/**", "**/tests/**"],
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./") },
  },
});
