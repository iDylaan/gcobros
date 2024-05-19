const db = require("../../models/index");
const { Customer } = require("../../models/index");
const { Subscription } = require("../../models/index");
const { Transaction } = require("../../models/index");
const FREQUENCIES = require("../transactions/paymentFrequencies");
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
      const lastTransaction = await Transaction.findOne({
        where: {
          domain: customer.customerDomain
        },
        order: [['created', 'DESC']],
        limit: 1
      })

      // Si no hay transacciones en la base de datos, empieza generación de los próximos pagos
      if (!lastTransaction) {
        const customerSubscriptions = await Subscription.findAll({
          where: {
            customerDomain: customer.customerDomain
          }
        })
        let totalSubsToPay = 0.0;

        // Validar el plan y la frecuancia de pago
        for (const subscription of customerSubscriptions) {
          // Obtener la frecuencia de pago
          const planName = subscription.plan_planName;
          const paymentFrequency = subscription.plan_paymentFrequency;
          const isCommited = subscription.plan_isCommitmentPlan;

          // Si la subscripción ya está confirmada, validar fecha de inicio y de cobro dependiendo de la frecuencia de pago
          if (isCommited) {
            const startDate = new Date(parseInt(subscription.plan_commitmentInterval_startTime));
            const endDate = new Date(parseInt(subscription.plan_commitmentInterval_endTime));
            const today = new Date();

            if (paymentFrequency === FREQUENCIES.ANNUAL) {
              // Frecuancia de pago anual

              // En caso de que aun no comience la subscripción, crear la transacción de pago
              if (today < startDate) {

              }
            }
            else if (paymentFrequency === FREQUENCIES.TRIMESTER) {
              // Frecuancia de pago trimestral
            } else {
              // Frecuancia de pago mensual
            }
          } else {

          }
        }
      } else {
        // Si ya existen transacciones en la base de datos, hay que revisar cuando fue la última


      }

    }
  } catch (error) {
    console.log("Error al actualizar las transactions: " + error);
  }
}
module.exports = {
  updateTransactions,
};
