const cron = require("node-cron");
const { updateSubscriptions } = require("../automatic/subscriptions.js");

function initCronJobs() {
    // Actualización de las subscripciones cada semana, el día lunes a las 03:00 hrs
    cron.schedule("0 3 * * 1", () => {
        console.log("Actualizando las subscripciones cada minuto");
        updateSubscriptions();
    }, {
        scheduled: true,
        timezone: "America/Mexico_City"
    });
}

module.exports = {
    initCronJobs
}