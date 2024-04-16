const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { log } = require("console");
const { inspect } = require("util");

const SCOPES = [
  "https://www.googleapis.com/auth/apps.order https://www.googleapis.com/auth/siteverification",
];
const CREDENTIALS_PATH = path.resolve(process.cwd(), "credentials.json");

/**
 * Load or request or authorization to call APIs.
 *
 */

function getCredentials() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: SCOPES,
    clientOptions: {
      subject: "iconos@gnerd.mx",
    },
  });

  return auth;
}

const getAllSubscriptionsFromGoogleWorkspace = async () => {
  const auth = getCredentials();

  const reseller = google.reseller({ version: "v1", auth: auth });

  let res = await reseller.subscriptions.list();
  let allSubscriptions = [];
  let nextPageToken = null;

  allSubscriptions = [...res.data.subscriptions];
  nextPageToken = res.data.nextPageToken;

  while (nextPageToken != null || nextPageToken != undefined) {
    let result = await reseller.subscriptions.list({
      pageToken: nextPageToken,
    });

    let subscriptions = result.data.subscriptions;

    if (!subscriptions || subscriptions.length === 0) {
      break;
    }

    allSubscriptions = [...allSubscriptions, ...subscriptions];

    nextPageToken = result.data.nextPageToken;
  }

  return allSubscriptions;
};

module.exports = {
  getAllSubscriptionsFromGoogleWorkspace,
};
