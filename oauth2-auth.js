import fs from "fs";
import { google } from "googleapis";
import readline from "readline";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = "oauth2-tokens.json";
const CREDENTIALS_PATH = "oauth2-credentials.json";

async function authorize() {
  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we already have a token
    if (fs.existsSync(TOKEN_PATH)) {
      const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH));
      oAuth2Client.setCredentials(tokens);
      
      // Test the token
      try {
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });
        const response = await drive.about.get({ fields: 'user' });
        console.log(`✅ Already authorized as: ${response.data.user.displayName}`);
        return oAuth2Client;
      } catch (error) {
        console.log('⚠️  Existing token expired, need to re-authorize');
      }
    }

    // Generate auth URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    console.log("🔗 Authorize this app by visiting this url:");
    console.log(authUrl);
    console.log("\n💡 After authorizing, you'll get a code to paste here.");

    // Get authorization code interactively
    const rl = readline.createInterface({ 
      input: process.stdin, 
      output: process.stdout 
    });
    
    return new Promise((resolve) => {
      rl.question("📝 Enter the code from that page here: ", async (code) => {
        rl.close();
        
        try {
          const { tokens } = await oAuth2Client.getToken(code);
          oAuth2Client.setCredentials(tokens);
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
          console.log("✅ Token stored to", TOKEN_PATH);
          
          // Test the connection
          const drive = google.drive({ version: 'v3', auth: oAuth2Client });
          const response = await drive.about.get({ fields: 'user' });
          console.log(`👤 Connected as: ${response.data.user.displayName}`);
          
          resolve(oAuth2Client);
        } catch (error) {
          console.error('❌ Authorization failed:', error.message);
          resolve(null);
        }
      });
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    return null;
  }
}

export { authorize, TOKEN_PATH, CREDENTIALS_PATH };

// If run directly, authorize
if (import.meta.url === `file://${process.argv[1]}`) {
  authorize().then((client) => {
    if (client) {
      console.log('🚀 Authorization complete! You can now run your Seaside Cinema tests.');
    } else {
      console.log('❌ Authorization failed. Please try again.');
    }
  });
}
