import { test, expect } from '@playwright/test';

test('get book now link', async ({ page }) => {
  await page.goto('https://www.seasidecinemas.com/');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Click the Book Now button - using a more specific selector
  await page.getByRole('link', { name: 'Book Now!' }).click();

  // Wait for navigation and expect the booking page heading
  await expect(page.getByRole('heading', { name: 'Book Your Experience' })).toBeVisible();
});
