const ip = process.env.NEXT_PUBLIC_HOST;

const readCustomerSubscriptionsByCustomerDomain = async (customerDomain) => {
    try {
        const customerSubscriptions = await fetch(`${ip}/api/customerSubscriptions/customer-domain/${customerDomain}`, {
            method: "GET",
        });

        if (customerSubscriptions === null) {
            return null;
        }

        return customerSubscriptions.json();

    } catch (error) {
        console.log("Error al obtener las customer subscriptions: " + error);
        return null;
    }
}

module.exports = {
    readCustomerSubscriptionsByCustomerDomain,
}