const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://example.com');
  
  // Get the page title
  const title = await page.title();
  console.log(`Title: ${title}`);
  
  // Check if the title is correct
  expect(title).toBe('Example Domain');
});
