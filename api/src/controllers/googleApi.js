const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const SPREADSHEET_ID = "1hMn0Nqk1wCVPKhLd3PSOwF_wr22OhEz9-vTx7f64Yj0";
const RANGE_CLEAR = "FORMULA!A2:E4929";
const RANGE_SET = "FORMULA!A2";
const USER_ENTERED = "USER_ENTERED";

/**
 * Method of authentication of Google Sheets.
 */
const authentication = () => {
  // If modifying these scopes, delete token.json.
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = path.join(process.cwd(), "token.json");
  const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

  /**
   * Reads previously authorized credentials from the save file.
   *
   * @return {Promise<OAuth2Client|null>}
   */
  async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  /**
   * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
   *
   * @param {OAuth2Client} client
   * @return {Promise<void>}
   */
  async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

  /**
   * Load or request or authorization to call APIs.
   *
   */
  async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }

  return authorize();
};

/**
 * Clear all cells in sheet.
 */
const clearSheet = async () => {
  try {
    const auth = await authentication().then((res) => res);
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_CLEAR,
    });
    return res;
  } catch (error) {
    return error.message;
  }
};

/**
 * Set information in sheet.
 * @param {value} is array of arrays
 */
const setSheet = async (values) => {
  try {
    const auth = await authentication().then((res) => res);
    const sheets = google.sheets({ version: "v4", auth });
    const resource = {
      values,
    };
    const res = await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE_SET,
      valueInputOption: USER_ENTERED,
      resource,
    });
    console.log("%d cells updated.", result.data.updatedCells);
    return res;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  clearSheet,
  setSheet,
};
