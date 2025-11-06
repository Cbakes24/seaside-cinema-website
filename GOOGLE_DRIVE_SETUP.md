# Seaside Cinema Google Drive Test Integration Setup

## 🚀 Quick Setup Guide

### Step 1: Google Cloud Console Setup

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create/Select Project**: 
   - Click "Select a project" → "New Project"
   - Name: `Seaside Cinema Tests`
   - Click "Create"

3. **Enable Google Drive API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Drive API"
   - Click "Enable"

4. **Create OAuth Consent Screen**:
   - Go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" (for personal use)
   - Fill out:
     - **App name**: `Seaside Cinema Tests`
     - **User support email**: `your-email@gmail.com`
     - **Developer contact**: `your-email@gmail.com`
   - Click "Save and Continue"
   - Skip "Scopes" → "Save and Continue"
   - Add yourself as test user:
     - Click "Add users"
     - Add your email
     - Click "Save"

5. **Create OAuth2 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Desktop application"
   - Name: `Seaside Cinema OAuth2`
   - Click "Create"
   - **Download the JSON file**
   - Rename to: `oauth2-credentials.json`
   - Place in your project root: `/Users/corybaker/Desktop/Seaside/seaside-cinema/`

### Step 2: First-Time Authorization

```bash
cd /Users/corybaker/Desktop/Seaside/seaside-cinema
node oauth2-auth.js
```

Follow the prompts:
1. Copy the authorization URL from console
2. Visit URL in browser
3. Sign in with Google account
4. Click "Allow"
5. Copy authorization code
6. Paste in terminal
7. Press Enter

You should see:
```
✅ Token stored to oauth2-tokens.json
👤 Connected as: Your Name
🚀 Authorization complete! You can now run your Seaside Cinema tests.
```

### Step 3: Run Your Test

```bash
npx playwright test tests/booking-test-with-drive.spec.ts --reporter=list
```

## 📁 What Gets Created

### In Google Drive:
- **Folder**: `Seaside Playwright Tests` (created automatically)
- **Files**: `Seaside_Booking_Test_YYYY-MM-DD-HH-MM-SS` (unique name each run)

### In Your Project:
- `oauth2-credentials.json` - Your Google API credentials
- `oauth2-tokens.json` - Your access tokens (auto-generated)
- `test-results/screenshots/` - Screenshots from each test run

## 📊 Test Report Contents

Each Google Doc contains:
- ✅ **Test Summary** (status, duration, timestamp)
- 📝 **Test Steps** (each step with pass/fail status)
- 📋 **Form Data** (what was submitted)
- 📸 **Screenshots** (visual evidence)
- ❌ **Errors** (if any failures)
- 🌐 **Browser Info** (browser, version, platform)
- ⚡ **Performance Metrics** (load times, etc.)

## 🔧 Troubleshooting

### "OAuth2 credentials not found"
- Make sure `oauth2-credentials.json` is in project root
- Check filename is exactly correct

### "Authorization failed"
- Make sure you copied the full authorization code
- Check you're using the correct Google account
- Verify OAuth consent screen is set up

### "Access blocked"
- Add yourself as test user in OAuth consent screen
- Or publish the app (for personal use)

### "Token expired"
- Delete `oauth2-tokens.json` and re-run authorization
- Or system will auto re-authorize

## 🎯 Test Features

Your test will:
1. **Navigate** to booking page
2. **Fill out** complete booking form
3. **Submit** booking
4. **Verify** success message
5. **Take screenshots** at each step
6. **Save detailed report** to Google Drive
7. **Generate unique filename** each run

## 🔒 Security Notes

- Tokens stored locally - never share `oauth2-tokens.json`
- Only you can access your Google Drive
- Revoke access anytime in Google Account settings
- Keep credentials file secure

## 🚀 Ready to Test!

Once set up, every test run will automatically:
- Create a detailed report in Google Drive
- Save screenshots locally
- Generate unique filenames
- Track performance metrics

Your Seaside Cinema booking tests are now fully integrated with Google Drive! 🎬✨
