const db = require("../../models/index");
const { Customer } = require("../../models/index");
const { Subscription } = require("../../models/index");
const { Transaction } = require("../../models/index");
const {
    createTransactionsInDatabase,
} = require("../transactions/transactionController");

// TODO: Crear el scheduler para actualizar las transacciones
async function updateTransactions() {
    console.log("Actualizador automatico de transacciones inicializado.");
    try {
        // Obtener todos los customers para obtener sus subscriptions
        const customers = await Customer.findAll({
            where: {
                active: true,
                paymentsActive: true
            }
        })

        // Obtener las subscriptions de cada customer para crear
        for (const customer of customers) {
            // TODO: Manejar la lógica para obtener las transacciones de cada customer 
            const lastTransaction = await Transaction.findOne({
                where: {
                    domain: customer.domain
                },
                order: [['created', 'DESC']],
                limit: 1,
            })

            const subscriptions = await Subscription.findAll({
                where: {
                    customerDomain: customer.customerDomain
                }
            })

        }
    } catch (error) {
        console.log("Error al actualizar las transactions: " + error);
    }
}
module.exports = {
    updateTransactions,
};
