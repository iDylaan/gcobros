const { CertificateFormat } = require("google-auth-library/build/src/auth/oauth2client");
const db = require("../../models/index");
const { Op } = require('sequelize');
const { Customer } = require("../../models/index");
const { Subscription } = require("../../models/index");
const { Transaction } = require("../../models/index");
const FREQUENCIES = require("../transactions/paymentFrequencies");
const {
  createTransactionsInDatabase,
} = require("../transactions/transactionController");
const moment = require('moment');


// TODO: Crear el scheduler para actualizar las transacciones
async function updateTransactions() {
  console.log("Actualizador automático de transacciones inicializado.");
  try {
    const customers = await Customer.findAll({
      where: {
        active: true,
        paymentsActive: true
      }
    });

    for (const customer of customers) {
      const customerSubscriptions = await Subscription.findAll({
        where: {
          customerDomain: customer.customerDomain,
          seats_kind: "subscriptions#seats",
          plan_planName: {
            [Op.ne]: "FREE"
          },
          totalToPay: {
            [Op.gt]: 0
          }
        }
      });

      for (const subscription of customerSubscriptions) {
        const planName = subscription.plan_planName;
        const lastTransaction = await Transaction.findOne({
          where: {
            domain: customer.customerDomain,
            subscriptionId: subscription.subscriptionId,
          },
          order: [['createdAt', 'DESC']],
          limit: 1
        });

        const isCommited = subscription.plan_isCommitmentPlan;
        const numberOfSeats = subscription.seats_licensedNumberOfSeats;
        const today = moment();

        if (isCommited) {
          if (!lastTransaction || today.isAfter(lastTransaction.payment_limit_day) || (lastTransaction.status !== 'TO_PAY' && lastTransaction.status !== 'DELAYED')) {
            await createCommitedTransaction(subscription, planName, customer, numberOfSeats);
          }
        } else {
          if (!lastTransaction || today.isAfter(lastTransaction.payment_limit_day) || (lastTransaction.status !== 'TO_PAY' && lastTransaction.status !== 'DELAYED')) {
            await createFlexibleTransaction(subscription, customer, numberOfSeats);
          }
        }
      }
    }
  } catch (error) {
    console.log("Error al actualizar las transacciones: " + error);
  }
}



function calculateNextPaymentDate(startDate, frequency) {
  let nextDate = moment(startDate);
  switch (frequency) {
    case 'MONTHLY':
      nextDate.add(1, 'months');
      break;
    case 'FLEXIBLE_MONTH':
      nextDate.add(1, 'months');
      break;
    case 'TRIMESTER':
      nextDate.add(3, 'months');
      break;
    case 'ANNUAL':
      nextDate.add(1, 'years');
      break;
    default:
      throw new Error('Frecuencia de pago no soportada' + frequency);
  }
  return nextDate;
}


async function createCommitedTransaction(subscription, planName, customer, numberOfSeats) {
  const startDate = moment(parseInt(subscription.plan_commitmentInterval_startTime));
  const endDate = moment(parseInt(subscription.plan_commitmentInterval_endTime));
  const today = moment();

  let paymentDate = startDate;
  while (paymentDate.isBefore(today) && paymentDate.isBefore(endDate)) {
    const nextPaymentDate = calculateNextPaymentDate(paymentDate, subscription.plan_paymentFrequency);
    if (nextPaymentDate.isAfter(today)) {
      const amount = parseFloat((subscription.totalToPay * 1.16).toFixed(2));
      if (isNaN(amount)) {
        throw new Error(`El valor de la cantidad es NaN para la suscripción: ${subscription.subscriptionId}`);
      }
      await Transaction.create({
        domain: customer.customerDomain,
        amount: amount,
        subscriptionId: subscription.subscriptionId,
        skuName: subscription.skuName,
        description: `Pago de ${amount} MXN por ${subscription.skuName} del ${startDate.format('DD-MM-YYYY')} al ${nextPaymentDate.format('DD-MM-YYYY')} proporcional a ${numberOfSeats} licencias.`,
        payment_open_day: today.toDate(),
        payment_limit_day: paymentDate.toDate(),
        planName: planName,
        status: "TO_PAY"
      });
    }
    paymentDate = nextPaymentDate;
  }
}



async function createFlexibleTransaction(subscription, customer, numberOfSeats) {
  const amount = parseFloat(((subscription.totalToPay * 1.16)).toFixed(2));
  if (isNaN(amount)) {
    throw new Error(`El valor de la cantidad es NaN para la suscripción: ${subscription.subscriptionId}`);
  }
  const today = moment();

  await Transaction.create({
    domain: customer.customerDomain,
    amount: amount,
    subscriptionId: subscription.subscriptionId,
    skuName: subscription.skuName,
    description: `Pago de ${amount.toFixed(2)} MXN por ${subscription.skuName} proporcional a ${numberOfSeats} licencias.`,
    payment_open_day: today.toDate(),
    payment_limit_day: moment().endOf('month').toDate(),
    planName: subscription.plan_planName,
    status: "TO_PAY"
  });
}


module.exports = {
  updateTransactions,
};
