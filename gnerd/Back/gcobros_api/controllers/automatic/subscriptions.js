const db = require("../../models/index");
const {
  getAllSubscriptionsFromGoogleWorkspace,
} = require("../resellerApiController");
const {
  createSubscriptionsInDatabase,
} = require("../subscriptions/subscriptionController");

// TODO: Crear el scheduler para actualizar las subscripciones
async function updateSubscriptions() {
  console.log("Actualizador automatico de subscripciones inicializado.");
  // Obtenemos todas las subscripciones mandando a llamar a la API de Google de manera periodica
  // para saber si hay nuevos clientes e ir actualizando la base de datos.
  const allSubscriptions = await getAllSubscriptionsFromGoogleWorkspace();

  // Guardamos todas las subscripciones en la base de datos, si ya existen validamos si tuvieron cambios,
  // la documentación google dice que cada vez que hay un cambio el "subscriptionId" se actualiza, entonces
  // se verifica si no ha tenido un cambio.
  await createSubscriptionsInDatabase(allSubscriptions);
}
module.exports = {
  updateSubscriptions,
};
