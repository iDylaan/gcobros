// const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const { handleResponse, handleErrorResponse } = require("./utils/misc.js");

const SCOPES = [
  "https://www.googleapis.com/auth/apps.order",
  "https://www.googleapis.com/auth/siteverification",
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

const getCustomersFromGoogleWorkspace = async (req, res) => {
  const auth = getCredentials();

  const reseller = google.reseller({ version: "v1", auth });

  try {
    let subscriptionsPage = await reseller.subscriptions.list();
    const subscriptionsArr = subscriptionsPage.data.subscriptions

    const allCustomersIDs = subscriptionsArr.map((subscription) => subscription.customerId);

    let allCustomers = await getCustomers(allCustomersIDs);

    return res.status(200).json(handleResponse(allCustomers));
  } catch (error) {
    console.log(error);
    return res.status(400).json(handleErrorResponse({ message: error }));
  }

}

async function getCustomers(customerIds) {
  const auth = getCredentials();
  const reseller = google.reseller({ version: "v1", auth });
  const customers = []
  try {
    for (const customerId of customerIds) {
      const customer = await reseller.customers.get({ customerId });
      customers.push(customer.data);
    }
  } catch (error) {
    console.log('Error en la consulta del customer ', customerId);
    console.log(error);
  }
  
  return customers;
}

module.exports = {
  getAllSubscriptionsFromGoogleWorkspace,
  getCustomersFromGoogleWorkspace
};
