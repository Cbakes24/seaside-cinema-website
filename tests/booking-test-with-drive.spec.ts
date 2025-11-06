import { test, expect } from '@playwright/test';
import GoogleDriveHelper from '../googleDriveHelper.js';

test.describe('Seaside Cinema Booking Tests with Google Drive Integration', () => {
  let driveHelper: GoogleDriveHelper;
  let testResults: any;

  test.beforeAll(async () => {
    // Initialize Google Drive helper
    driveHelper = new GoogleDriveHelper();
    const initialized = await driveHelper.initialize();
    
    if (!initialized) {
      console.log('⚠️  Google Drive not initialized. Test will run without Drive integration.');
    }
  });

  test('Simple booking test with Google Drive reporting', async ({ page, browserName }) => {
    const startTime = Date.now();
    const testName = 'Simple Booking Test';
    const timestamp = new Date().toISOString();
    
    // Helper function to take screenshots
    const takeScreenshot = async (name: string) => {
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = `test-results/screenshots/${name}_${timestamp}.png`;
        
        console.log(`📸 Capturing screenshot: ${name}`);
        await page.screenshot({ 
          path: screenshotPath,
          fullPage: true 
        });
        console.log(`✅ Screenshot saved: ${screenshotPath}`);
        
        testResults.screenshots.push({
          name,
          path: screenshotPath,
          timestamp: new Date().toISOString(),
          description: `Screenshot taken during ${name}`
        });
      } catch (error) {
        console.error(`❌ Failed to take screenshot ${name}:`, error.message);
      }
    };
    
    // Initialize test results object
    testResults = {
      testName,
      status: 'running',
      timestamp,
      duration: 0,
      steps: [],
      formData: {},
      screenshots: [],
      errors: [],
      browserInfo: {
        name: browserName,
        version: await page.evaluate(() => navigator.userAgent),
        platform: process.platform
      },
      performance: {}
    };

    try {
      // Step 1: Navigate to booking page
      console.log('📱 Navigating to booking page...');
      await page.goto('https://www.seasidecinemas.com/book');
      await page.waitForLoadState('domcontentloaded');
      console.log('🖼️  SCREENSHOT TAKEN: Booking page loaded');
      await takeScreenshot('01_booking_page_loaded');

      // Step 2: Handle modal if present
      try {
        const checkLaterButton = page.getByRole('button', { name: 'Check Later' });
        if (await checkLaterButton.isVisible({ timeout: 3000 })) {
          await checkLaterButton.click();
        }
      } catch (error) {
        console.log('No modal found or already dismissed');
      }

      // Step 3: Select Classic experience
      console.log('🎬 Selecting Classic experience...');
      const experienceButton = page.getByRole('button', { name: 'Classic - End of Summer Sale!' });
      await experienceButton.click();
      console.log('🖼️  SCREENSHOT TAKEN: Classic experience selected');
      await takeScreenshot('02_classic_selected');

      // Step 4: Change guest count from 2 to 4
      console.log('👥 Changing guest count from 2 to 4...');
      const guestField = page.locator('form').getByPlaceholder('2', { exact: true });
      await guestField.click();
      await guestField.fill('4');
      console.log('🖼️  SCREENSHOT TAKEN: Guest count changed to 4');
      await takeScreenshot('03_guests_changed_to_4');

      // Mark test as passed
      testResults.status = 'passed';
      
    } catch (error) {
      // Mark test as failed and capture error
      testResults.status = 'failed';
      testResults.errors.push({
        message: error.message,
        stack: error.stack
      });
      await takeScreenshot('error_final_state');
      throw error;
    } finally {
      // Calculate duration
      testResults.duration = Date.now() - startTime;

      // Save to Google Drive if initialized
      if (driveHelper && driveHelper.drive) {
        try {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const fileName = `Seaside_Simple_Test_${timestamp}`;
          
          const fileId = await driveHelper.createBookingTestReport(fileName, testResults);
          console.log(`✅ Test results saved to Google Drive: ${fileName}`);
          console.log(`🔗 View report: https://docs.google.com/document/d/${fileId}/edit`);
        } catch (driveError) {
          console.error('❌ Failed to save to Google Drive:', driveError.message);
        }
      } else {
        console.log('⚠️  Google Drive not available. Test results not saved to Drive.');
      }
    }
  });


});
