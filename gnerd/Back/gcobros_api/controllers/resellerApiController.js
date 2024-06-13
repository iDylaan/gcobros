// const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { handleResponse, handleErrorResponse } = require("./utils/misc.js");
const { getCredentials } = require("./credentials.js");


const SCOPES = [
  "https://www.googleapis.com/auth/apps.order",
  "https://www.googleapis.com/auth/siteverification",
];

const getAllSubscriptionsFromGoogleWorkspace = async () => {
  const auth = getCredentials(SCOPES);

  const reseller = google.reseller({ version: "v1", auth });

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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCustomersFromGoogleWorkspace = async () => {
  const auth = getCredentials(SCOPES);

  const reseller = google.reseller({ version: "v1", auth });

  try {
    let subscriptions = await getAllSubscriptionsFromGoogleWorkspace();
    const customersIds = subscriptions.map((subscription) => subscription.customerId);
    const uniqueCustomerIds = [...new Set(customersIds)];
    const customers = []
    for (const customerId of uniqueCustomerIds) {
      const customer = await reseller.customers.get({ customerId });
      customers.push(customer.data);

      // Esperar 200ms antes de la siguiente solicitud (para no sobrecargar la API de Google Workspace)
      await delay(200);
    }
    return customers;
  } catch (error) {
    console.log(error);
    return [];
  }
}

module.exports = {
  getAllSubscriptionsFromGoogleWorkspace,
  getCustomersFromGoogleWorkspace
};
