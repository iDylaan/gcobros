const cron = require("node-cron");
const { updateSubscriptions } = require("../automatic/subscriptions.js");
const { updateCustomers } = require("../automatic/customers.js");

function initCronJobs() {
    // Actualización de las subscripciones cada semana, el día lunes a las 03:00 hrs
    cron.schedule("0 3 * * 1", () => {
        console.log("Updating subscriptions...");
        updateSubscriptions();
    }, {
        scheduled: true,
        timezone: "America/Mexico_City"
    });

    // Actualización de los customers cada semana, el día lunes a las 04:00 hrs
    cron.schedule("0 4 * * 1", () => {
        console.log("Updating customers...");
        updateCustomers();
    }, {
        scheduled: true,
        timezone: "America/Mexico_City"
    });
}

module.exports = {
    initCronJobs
}