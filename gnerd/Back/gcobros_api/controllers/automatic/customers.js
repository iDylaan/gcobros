const { getCustomersFromGoogleWorkspace } = require("../resellerApiController");
const { createCustomersInDatabase } = require("../customers/customerController");


async function updateCustomers() {
    try {
        console.log("Actualizador automático de clientes inicializado.");
        const customers = await getCustomersFromGoogleWorkspace();

        await createCustomersInDatabase(customers);
    } catch (error) {
        console.log("Error al actualizar clientes: " + error);
    }
}

module.exports = {
    updateCustomers
}