import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.seasidecinemas.com');
  await page.getByRole('button', { name: 'Check Later' }).click();
  await page.locator('div').filter({ hasText: /^\$0Book Now$/ }).getByRole('link').click();
  await page.getByRole('button', { name: 'Select a holiday theme' }).click();
  await page.getByRole('button', { name: 'Pumpkin Spice and Everything' }).click();
  await page.locator('div').filter({ hasText: /^👥 Guests: \(min 2\)$/ }).getByPlaceholder('2').click();
  await page.locator('div').filter({ hasText: /^👥 Guests: \(min 2\)$/ }).getByPlaceholder('2').fill('4');
  await page.getByRole('textbox', { name: 'Enter your full name' }).click();
  await page.getByRole('textbox', { name: 'Enter your full name' }).fill('Cory');
  await page.locator('select[name="howHeard"]').selectOption('Instagram');
  await page.getByRole('textbox', { name: 'your@email.com' }).click();
  await page.getByRole('textbox', { name: 'your@email.com' }).fill('corybaker24@gmail.com');
  await page.getByRole('textbox', { name: '(555) 123-' }).click();
  await page.getByRole('textbox', { name: '(555) 123-' }).fill('7814920313');
  await page.locator('select[name="type"]').selectOption('iphone');
  await page.locator('input[type="date"]').fill('2025-10-13');
  await page.locator('input[type="time"]').click();
  await page.locator('input[type="time"]').fill('01:01');
  await page.getByRole('button', { name: 'Submit Booking - $' }).click();
});
