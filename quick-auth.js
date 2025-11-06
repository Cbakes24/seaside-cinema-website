import fs from "fs";
import { google } from "googleapis";

const CREDENTIALS_PATH = "oauth2-credentials.json";
const TOKEN_PATH = "oauth2-tokens.json";

// Use the code you got from the URL
const AUTH_CODE = "4/0AVGzR1D55avdq4QPLI6jEMGsqjEyG_wA-4V3vhPyxYzIP1AHh24Pngof97FQOxokM2aCSA";

async function quickAuth() {
  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    console.log("🔄 Exchanging authorization code for tokens...");
    
    const { tokens } = await oAuth2Client.getToken(AUTH_CODE);
    oAuth2Client.setCredentials(tokens);
    
    // Save tokens
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log("✅ Token stored to", TOKEN_PATH);
    
    // Test the connection
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    const response = await drive.about.get({ fields: 'user' });
    console.log(`👤 Connected as: ${response.data.user.displayName}`);
    console.log("🚀 Authorization complete! You can now run your tests.");
    
  } catch (error) {
    console.error('❌ Authorization failed:', error.message);
    console.log("💡 The authorization code may have expired. Please get a new one.");
  }
}

quickAuth();
