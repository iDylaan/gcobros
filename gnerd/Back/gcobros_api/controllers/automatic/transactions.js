const { CertificateFormat } = require("google-auth-library/build/src/auth/oauth2client");
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

      // Si no hay transacciones en la base de datos, empieza generación de los próximos pagos
      const customerSubscriptions = await Subscription.findAll({
        where: {
          customerDomain: customer.customerDomain
        }
      })

      // Validar el plan y la frecuancia de pago
      for (const subscription of customerSubscriptions) {
        // Obtener la frecuencia de pago
        const planName = subscription.plan_planName;
        const paymentFrequency = subscription.plan_paymentFrequency;

        const lastTransaction = Transaction.findOne({
          where: {
            domain: customer.customerDomain,
            subscriptionId: subscription.subscriptionId
          },
          order: [['createdAt', 'DESC']],
          limit: 1
        })

        const isCommited = subscription.plan_isCommitmentPlan;

        if (paymentFrequency === FREQUENCIES.ANNUAL) {
          // Frecuancia de pago anual

          if (isCommited) {
            // SI NO HAY TRANSACCIONES EN LA BASE DE DATOS
            if (!lastTransaction) {
              if (today < startDate) {
                // Si aun no inicia su periodo
                createCommitedTransaction(subscription, planName, customer);
              } else if (today > startDate && today < endDate) {
                // Si ya inicio su periodo
                createCommitedTransaction(subscription, planName, customer);
              }
            }
          } else {
            // Plan Flexible
            if (!lastTransaction) {
              const today = new Date();

              Transaction.create({
                domain: customer.customerDomain,
                amount: (subscription.totalToPay * 1.16),
                subscriptionId: subscription.subscriptionId,
                skuName: subscription.skuName,
                description: "Pago de " + (subscription.totalToPay * 1.16) + " mxn por " + subscription.skuName + " del " + startDate + " al " + endDate + ".",
                payment_open_day: today,
                payment_limit_day: startDate,
                planName: planName,
                status: "TO_PAY"
              })
            }
          }
        }
        else if (paymentFrequency === FREQUENCIES.TRIMESTER) {
          // Frecuancia de pago trimestral

          // 
        } else {
          // Frecuancia de pago mensual
        }
      }
    }
  } catch (error) {
    console.log("Error al actualizar las transactions: " + error);
  }
}

async function createCommitedTransaction(subscription, planName, customer) {
  try {
    const startDate = new Date(parseInt(subscription.plan_commitmentInterval_startTime));
    const endDate = new Date(parseInt(subscription.plan_commitmentInterval_endTime));
    const today = new Date();

    Transaction.create({
      domain: customer.customerDomain,
      amount: (subscription.totalToPay * 1.16),
      subscriptionId: subscription.subscriptionId,
      skuName: subscription.skuName,
      description: "Pago de " + (subscription.totalToPay * 1.16) + " mxn por " + subscription.skuName + " del " + startDate + " al " + endDate + ".",
      payment_open_day: today,
      payment_limit_day: startDate,
      planName: planName,
      status: "TO_PAY"
    })
  } catch (error) {
    throw new Error(error);
  }
}

async function createFlexibleTransaction() {
  try {

  } catch (error) {
    throw new Error(error);
  }
}


module.exports = {
  updateTransactions,
};
