import { test, expect } from '@playwright/test';

test('test CODE GEN test rceated', async ({ page }) => {
  await page.getByRole('button', { name: 'Check Later' }).click();
  await page.locator('div').filter({ hasText: 'Seasonal ExperiencesCelebrate' }).getByRole('link').first().click();
  await page.getByRole('button', { name: 'No Package Selected' }).click();
  await page.getByRole('main').nth(1).click();
  await page.getByRole('textbox', { name: 'Enter your full name' }).click();
  await page.getByRole('textbox', { name: 'Enter your full name' }).fill('cory');
  await page.locator('select[name="howHeard"]').selectOption('Facebook');
  await page.getByRole('textbox', { name: 'your@email.com' }).selectOption('Facebook');
  await page.locator('select[name="howHeard"]').click();
  await page.getByText('Full Name *How did you hear').click();
  await page.getByRole('textbox', { name: 'your@email.com' }).click();
  await page.getByRole('textbox', { name: 'your@email.com' }).dblclick();
  await page.getByRole('textbox', { name: 'your@email.com' }).fill('corybaker24@gmail.com');
  await page.getByRole('textbox', { name: '(555) 123-' }).click();
  await page.getByRole('textbox', { name: '(555) 123-' }).fill('7814920313');
  await page.locator('select[name="type"]').selectOption('iphone');
  // await page.locator('input[type="date"]').selectOption('iphone');
  await page.locator('input[type="date"]').fill('2025-09-12');  //how to get the click and fill and not have to enter manually
  await page.locator('input[type="time"]').click(); //how to get the click and fill and not have to enter manually
  await page.locator('input[type="time"]').fill('15:33');
  await page.locator('form').getByPlaceholder('2', { exact: true }).click(); //guests count
  await page.locator('form').getByPlaceholder('2', { exact: true }).fill('3');
  await page.getByRole('button', { name: 'Submit Booking - $' }).click();
  await page.getByText('🎉 Success! Your booking has').click();
});
