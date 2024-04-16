const ip = process.env.NEXT_PUBLIC_HOST;

const getAllDomains = async () => {
  try {
    const allDomains = await fetch(`${ip}/api/subscriptions/domains`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    });
    return allDomains.json();
  } catch (error) {
    console.log("Error al obtener los dominios permitidos: " + error);
    return null;
  }
};

const readAllSubscriptionsByCustomerDomain = async (customerDomain) => {
  try {
    const allSubscriptions = await fetch(
      `${ip}/api/subscriptions/customer-domain/${customerDomain}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    return allSubscriptions.json();
  } catch (error) {
    console.log(
      `Error al obtener las subscriptiones del dominio: ${customerDomain}`
    );
    return null;
  }
};

module.exports = {
  getAllDomains,
  readAllSubscriptionsByCustomerDomain,
};
