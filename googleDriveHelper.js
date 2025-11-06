import { google } from 'googleapis';
import fs from 'fs';
import { authorize } from './oauth2-auth.js';

class GoogleDriveHelper {
  constructor() {
    this.drive = null;
    this.auth = null;
  }

  async initialize() {
    try {
      if (!fs.existsSync('oauth2-credentials.json')) {
        console.log('🔧 OAuth2 credentials not found');
        return false;
      }

      this.auth = await authorize();
      
      if (!this.auth) {
        console.log('❌ Authorization failed');
        return false;
      }

      this.drive = google.drive({ version: 'v3', auth: this.auth });
      console.log('✅ OAuth2 Google Drive API initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize OAuth2:', error.message);
      return false;
    }
  }

  async findOrCreateFolder(folderName = 'Seaside Playwright Tests') {
    try {
      // Find existing folder
      const response = await this.drive.files.list({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
        fields: 'files(id, name)'
      });

      if (response.data.files.length > 0) {
        console.log(`📁 Found existing folder: ${response.data.files[0].name}`);
        return response.data.files[0].id;
      }

      // Create new folder
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
      };

      const folder = await this.drive.files.create({
        resource: folderMetadata,
        fields: 'id'
      });

      console.log(`📁 Created new folder: ${folderName}`);
      return folder.data.id;
    } catch (error) {
      console.error('Error finding/creating folder:', error.message);
      throw error;
    }
  }

  async createGoogleDoc(title, content) {
    if (!this.drive) {
      throw new Error('OAuth2 not initialized. Call initialize() first.');
    }

    try {
      const folderId = await this.findOrCreateFolder();

      const fileMetadata = {
        name: title,
        mimeType: 'application/vnd.google-apps.document',
        parents: [folderId]
      };

      const media = {
        mimeType: 'text/plain',
        body: content
      };

      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      });

      console.log(`✅ Created Google Doc: ${title}`);
      console.log(`📁 Saved in folder: Seaside Playwright Tests`);
      console.log(`🔗 View at: https://docs.google.com/document/d/${response.data.id}/edit`);
      return response.data.id;
    } catch (error) {
      console.error('Error creating Google Doc:', error.message);
      throw error;
    }
  }

  async createBookingTestReport(title, testResults) {
    let content = `Seaside Cinema Booking Test Report\n`;
    content += `Generated: ${new Date().toLocaleString()}\n\n`;
    content += '='.repeat(60) + '\n\n';

    // Test Summary
    content += `TEST SUMMARY\n`;
    content += `-`.repeat(20) + '\n';
    content += `Test Name: ${testResults.testName}\n`;
    content += `Status: ${testResults.status}\n`;
    content += `Duration: ${testResults.duration}ms\n`;
    content += `Timestamp: ${testResults.timestamp}\n\n`;

    // Test Steps
    if (testResults.steps && testResults.steps.length > 0) {
      content += `TEST STEPS\n`;
      content += `-`.repeat(20) + '\n';
      testResults.steps.forEach((step, index) => {
        content += `${index + 1}. ${step.description}\n`;
        content += `   Status: ${step.status}\n`;
        if (step.duration) {
          content += `   Duration: ${step.duration}ms\n`;
        }
        if (step.error) {
          content += `   Error: ${step.error}\n`;
        }
        content += '\n';
      });
    }

    // Form Data
    if (testResults.formData) {
      content += `FORM DATA SUBMITTED\n`;
      content += `-`.repeat(20) + '\n';
      Object.entries(testResults.formData).forEach(([key, value]) => {
        content += `${key}: ${value}\n`;
      });
      content += '\n';
    }

    // Screenshots/Evidence
    if (testResults.screenshots && testResults.screenshots.length > 0) {
      content += `SCREENSHOTS\n`;
      content += `-`.repeat(20) + '\n';
      testResults.screenshots.forEach((screenshot, index) => {
        content += `${index + 1}. ${screenshot.name}\n`;
        content += `   Path: ${screenshot.path}\n`;
        content += `   Timestamp: ${screenshot.timestamp}\n\n`;
      });
    }

    // Errors
    if (testResults.errors && testResults.errors.length > 0) {
      content += `ERRORS\n`;
      content += `-`.repeat(20) + '\n';
      testResults.errors.forEach((error, index) => {
        content += `${index + 1}. ${error.message}\n`;
        content += `   Stack: ${error.stack}\n\n`;
      });
    }

    // Browser Info
    if (testResults.browserInfo) {
      content += `BROWSER INFO\n`;
      content += `-`.repeat(20) + '\n';
      content += `Browser: ${testResults.browserInfo.name}\n`;
      content += `Version: ${testResults.browserInfo.version}\n`;
      content += `Platform: ${testResults.browserInfo.platform}\n\n`;
    }

    // Performance Metrics
    if (testResults.performance) {
      content += `PERFORMANCE METRICS\n`;
      content += `-`.repeat(20) + '\n';
      Object.entries(testResults.performance).forEach(([key, value]) => {
        content += `${key}: ${value}\n`;
      });
      content += '\n';
    }

    content += '='.repeat(60) + '\n';
    content += `Report generated by Seaside Cinema Playwright Test Suite\n`;
    content += `Generated at: ${new Date().toISOString()}\n`;

    return await this.createGoogleDoc(title, content);
  }

  async createScreenshotReport(title, screenshots) {
    let content = `Seaside Cinema Test Screenshots\n`;
    content += `Generated: ${new Date().toLocaleString()}\n\n`;
    content += '='.repeat(60) + '\n\n';

    screenshots.forEach((screenshot, index) => {
      content += `${index + 1}. ${screenshot.name}\n`;
      content += `   Timestamp: ${screenshot.timestamp}\n`;
      content += `   Path: ${screenshot.path}\n`;
      content += `   Description: ${screenshot.description || 'No description'}\n\n`;
    });

    content += '='.repeat(60) + '\n';
    content += `Screenshot report generated by Seaside Cinema Playwright Test Suite\n`;

    return await this.createGoogleDoc(title, content);
  }
}

export default GoogleDriveHelper;
