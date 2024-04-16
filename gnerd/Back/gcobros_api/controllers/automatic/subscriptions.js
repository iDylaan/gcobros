const db = require("../../models/index");
const {
  getAllSubscriptionsFromGoogleWorkspace,
} = require("../resellerApiController");
const {
  createSubscriptionsInDatabase,
} = require("../subscriptions/subscriptionController");

async function updateSubscriptions() {
  console.log("Actualizador automatico de subscripciones inicializado.");
  setInterval(async () => {
    // Obtenemos todas las subscripciones mandando a llamar a la API de Google de manera periodica
    // para saber si hay nuevos clientes e ir actualizando la base de datos.
    const allSubscriptions = await getAllSubscriptionsFromGoogleWorkspace();

    // Guardamos todas las subscripciones en la base de datos, si ya existen validamos si tuvieron cambios,
    // la documentación google dice que cada vez que hay un cambio el "subscriptionId" se actualiza, entonces
    // se verifica si no ha tenido un cambio.
    await createSubscriptionsInDatabase(allSubscriptions);
  }, 43200000);
}
module.exports = {
  updateSubscriptions,
};
