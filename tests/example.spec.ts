import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.seasidecinemas.com/');
});

test('get book now link', async ({ page }) => {
  // Click the Book Now button - using a more specific selector
  await page.getByRole('link', { name: 'Book Now!' }).click();

  // Wait for navigation and expect the booking page heading
  await expect(page.getByRole('heading', { name: 'Book Your Experience' })).toBeVisible();
});

test('complete booking form submission', async ({ page }) => {
  // Navigate to booking page
  // Wait for the page to load
  // Select an experience (Classic)
  // Fill out required customer information
  // Fill occasion type
  // Correct date format
  // Set date and time
  // Correct time format (if HTML input is type="time")
  // Set guest count (using nth beauce playwright gets confused because there are 2 guest count entiry points so were using the first one to enter the guest amount)
  // await page.getByLabel('👥 Number of Guests *').fill('2');
  // Submit the booking
  // Wait for and verify the success message  
await page.goto('https://www.seasidecinemas.com/book');
await page.waitForLoadState('domcontentloaded');
await page.getByRole('button', { name: 'Classic' }).click();
await page.getByRole('button', { name: 'Bali' }).click();
await page.getByPlaceholder('Enter your full name').fill('Cory Baker');
await page.locator('select[name="howHeard"]').selectOption('Instagram');
await page.getByPlaceholder('(555) 123-4567').fill('7814920313');
await page.getByPlaceholder('your@email.com').fill('cory@seasidecinemas.com');
await page.locator('input[type="date"]').fill('2025-07-16');
await page.locator('[type="time"]').fill('16:45'); // 24-hr format
await page.locator('select[name="type"]').selectOption('iphone');
await page.locator('input[type="number"][min="2"]').nth(0).fill('4');
await page.getByRole('button', { name: /Submit Booking/ }).click();
await expect(page.locator('text=🎉 Success! Your booking has been submitted. Thank you for choosing us! 🎬')).toBeVisible();
});





test('booking form validation - missing required fields', async ({ page }) => {
  // Navigate to booking page
  await page.goto('https://www.seasidecinemas.com/book');

  // Try to submit without filling required fields
  await page.getByRole('button', { name: /Submit Booking/ }).click();

  // Verify that the form shows validation errors or doesn't submit
  // The button should remain disabled or show validation messages
  await expect(page.getByRole('button', { name: /Submit Booking/ })).toBeDisabled();
});

test('discount code application', async ({ page }) => {
  // Navigate to booking page
  await page.goto('https://www.seasidecinemas.com/book');

  // Select an experience to see pricing
  await page.getByRole('button', { name: 'Select an experience' }).click();
  await page.getByRole('button', { name: 'Classic' }).click();

  // Fill out minimum required fields
  await page.getByLabel('Full Name *').fill('Jane Smith');
  await page.getByLabel('How did you hear about us? *').fill('Friend');
  await page.getByLabel('Email *').fill('jane.smith@example.com');
  await page.getByLabel('Phone Number *').fill('555-987-6543');
  await page.getByLabel('Type Of Phone *').selectOption('android');
  await page.getByLabel('Occasion Type *').fill('Birthday');
  await page.getByLabel('Preferred Date *').fill('2024-12-26');
  await page.getByLabel('Start Time *').fill('18:00');
  await page.getByLabel('👥 Number of Guests *').fill('2');

  // Apply discount code
  await page.getByPlaceholder('Enter discount code').fill('Autumn25');
  await page.getByRole('button', { name: 'Apply' }).click();

  // Verify discount is applied
  await expect(page.locator('text=🎉 Discount Applied: AUTUMN25')).toBeVisible();
  
  // Verify discount amount is shown
  await expect(page.locator('text=-$30')).toBeVisible();
});


//FROM GPT


test('should submit a booking successfully', async ({ page }) => {
  // Go to homepage
  await page.goto('https://www.seasidecinemas.com/');

  // Click the main "Book Now!" button
  await page.getByRole('link', { name: /Book Now/i }).click();

  // Wait for the heading on the booking page
  await expect(page.getByRole('heading', { name: /Book Your Experience/i })).toBeVisible();

  // Select experience (pick a visible button/dropdown item)
  await page.getByRole('button', { name: /Select Your Experience/i }).click();
  await page.getByRole('button', { name: /Classic/i }).click();

  // Fill in form fields
  await page.getByLabel('Full Name *').fill('Test User');
  await page.getByLabel('How did you hear about us? *').fill('Google');
  await page.getByLabel('Email *').fill('test@example.com');
  await page.getByLabel('Phone Number *').fill('555-123-4567');
  await page.getByLabel('Type Of Phone *').selectOption('iphone');
  await page.getByLabel('Occasion Type *').fill('Birthday');
  await page.getByLabel('Preferred Date *').fill('2025-12-25');
  await page.getByLabel('Start Time *').fill('18:00');
  await page.getByLabel('👥 Number of Guests *').fill('4');

  // Submit the form
  await page.getByRole('button', { name: /Submit Booking/i }).click();

  // Expect success toast to appear
  await expect(page.locator('text=🎉 Success! Your booking has been submitted')).toBeVisible();
});
