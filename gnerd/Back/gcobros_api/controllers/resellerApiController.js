// const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
// const { log } = require("console");
// const { inspect } = require("util");

const SCOPES = [
  "https://www.googleapis.com/auth/apps.order https://www.googleapis.com/auth/siteverification",
];

function getCredentials() {
  const auth = new google.auth.GoogleAuth({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH,
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
