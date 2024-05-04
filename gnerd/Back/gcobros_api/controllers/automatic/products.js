const { Product } = require("../../models/index");
const { getProductBySkuId, createProductsInDatabase } = require("../products/productController");
const { getAllSubscriptionsFromGoogleWorkspace } = require("../resellerApiController");


async function updateProducts() {
    try {
        console.log("Actualizador automático de productos inicializado.");
        const subscriptions = await getAllSubscriptionsFromGoogleWorkspace();

        await createProductsInDatabase(subscriptions);
    } catch (error) {
        console.log("Error al actualizar productos: " + error);
    }
}

module.exports = {
    updateProducts
}