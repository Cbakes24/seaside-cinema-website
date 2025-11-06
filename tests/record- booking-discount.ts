import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.seasidecinemas.com/');
  await page.getByRole('button', { name: '🎬 Book Now & Save $50!' }).click();
  await page.getByRole('button', { name: 'Classic - End of Summer Sale!' }).click();
  await page.getByRole('button', { name: 'Bali - End of Summer Sale!' }).click();
  await page.getByRole('checkbox', { name: 'Charcuterie Board Lg (10–20' }).check();
  await page.getByRole('checkbox', { name: 'Addl. 30 Minutes Extend your' }).check();
  await page.getByRole('button', { name: 'No Package Selected' }).click();
  await page.getByRole('button', { name: 'Drive-in Popcorn, candy trays' }).click();
  await page.locator('div').filter({ hasText: /^👥 Guests: \(min 2\)$/ }).getByPlaceholder('2').click();
  await page.locator('div').filter({ hasText: /^👥 Guests: \(min 2\)$/ }).getByPlaceholder('2').click();
  await page.locator('div').filter({ hasText: /^👥 Guests: \(min 2\)$/ }).getByPlaceholder('2').fill('6');
  await page.getByRole('textbox', { name: 'Enter discount code' }).click();
  await page.getByRole('textbox', { name: 'Enter discount code' }).fill('Autumn25');
  //the page alerts that the discount has been applied
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByRole('textbox', { name: 'Enter your full name' }).click();
  await page.getByRole('textbox', { name: 'Enter your full name' }).fill('Cory');
  await page.locator('select[name="howHeard"]').selectOption('Instagram');
  await page.getByRole('textbox', { name: 'your@email.com' }).selectOption('Instagram');
  await page.locator('select[name="howHeard"]').click();
  await page.getByRole('textbox', { name: 'your@email.com' }).click();
  await page.getByRole('textbox', { name: 'your@email.com' }).fill('corybaker24@gmail.com');
  await page.getByRole('textbox', { name: '(555) 123-' }).click();
  await page.getByRole('textbox', { name: '(555) 123-' }).fill('781');
  await page.locator('select[name="type"]').selectOption('iphone');
  await page.locator('input[type="date"]').fill('2025-10-15');
  await page.locator('form').getByPlaceholder('2', { exact: true }).click();
  await page.locator('input[type="time"]').click();
  await page.locator('input[type="time"]').fill('15:33');
  await page.getByRole('button', { name: 'Submit Booking - $' }).click();
});
