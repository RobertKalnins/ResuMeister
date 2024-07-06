const { test, expect } = require('@playwright/test');
const path = require('path');

test('run local file', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../docs/index.html');
  const fileUrl = `file://${filePath}`;

  // Navigate to the local file
  await page.goto(fileUrl);

  // Perform your test actions here
  // For example, check if the page title is correct
  await expect(page).toHaveTitle('Resumeister');

  // Add more assertions and interactions as needed
});
