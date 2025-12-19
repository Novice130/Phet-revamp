import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  retries: 0,
  use: {
    baseURL: "http://127.0.0.1:4173/phet-revamp/",
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173/phet-revamp/",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
