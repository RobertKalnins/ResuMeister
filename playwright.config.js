const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directory where the tests are located
  timeout: 30000, // Maximum time one test can run in milliseconds
  retries: 2, // Number of times to retry a failed test
  use: {
    headless: true, // Run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Default viewport size
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'on-first-retry', // Record video only when retrying a failed test
  },
});
