import { test, expect } from '@playwright/test';
import GoogleDriveHelper from '../googleDriveHelper.js';

test.describe('Simple Test with Google Drive', () => {
  let driveHelper: GoogleDriveHelper;

  test.beforeAll(async () => {
    // Initialize Google Drive helper
    driveHelper = new GoogleDriveHelper();
    const initialized = await driveHelper.initialize();
    
    if (!initialized) {
      console.log('⚠️  Google Drive not initialized. Test will run without Drive integration.');
    }
  });

  test('Simple test - just take a screenshot and save to Drive', async ({ page, browserName }) => {
    const startTime = Date.now();
    const testName = 'Simple Screenshot Test';
    const timestamp = new Date().toISOString();
    
    // Initialize test results object
    const testResults = {
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
      console.log('🚀 Starting simple test...');
      
      // Step 1: Navigate to booking page
      console.log('📱 Navigating to booking page...');
      await page.goto('https://www.seasidecinemas.com/book');
      await page.waitForLoadState('domcontentloaded');
      console.log('✅ Page loaded successfully');

      // Step 2: Take screenshot
      console.log('📸 Taking screenshot...');
      console.log('🖼️  SCREENSHOT TAKEN: Booking page loaded');
      const screenshotPath = `test-results/screenshots/simple_test_${timestamp.replace(/[:.]/g, '-')}.png`;
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });
      console.log('✅ Screenshot saved:', screenshotPath);

      testResults.screenshots.push({
        name: 'simple_test',
        path: screenshotPath,
        timestamp: new Date().toISOString(),
        description: 'Simple test screenshot'
      });

      // Mark test as passed
      testResults.status = 'passed the banana test';
      console.log('✅ Test completed successfully');
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      testResults.status = 'failed';
      testResults.errors.push({
        message: error.message,
        stack: error.stack
      });
      throw error;
    } finally {
      // Calculate duration
      testResults.duration = Date.now() - startTime;
      console.log(`⏱️  Test duration: ${testResults.duration}ms`);

      // Save to Google Drive if initialized (with timeout)
      if (driveHelper && driveHelper.drive) {
        try {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const fileName = `Seaside_Simple_Screenshot_Test_${timestamp}`;
          
          console.log('💾 Saving to Google Drive...');
          
          // Add timeout to prevent hanging
          const savePromise = driveHelper.createBookingTestReport(fileName, testResults);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Google Drive save timeout')), 10000)
          );
          
          const fileId = await Promise.race([savePromise, timeoutPromise]);
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
