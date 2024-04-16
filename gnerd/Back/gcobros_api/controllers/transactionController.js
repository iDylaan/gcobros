const db = require("../models/index");
const { Transaction } = require("../models/index");

const createTransaction = async (req, res) => {
  try {
    let transaction = req.body;
    transaction = await Transaction.create(transaction);
    return res.status(200).json(transaction);
  } catch (error) {
    console.log("No fue posible guardar la transaccion: " + error);
    return res.status(200).json(null);
  }
};

const readTransaction = async (req, res) => {
  try {
    let transactions = await Transaction.findAll();
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(200).json(null);
  }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //

const readTransactionCustomerReference = async (req, res) => {
  try {
    const customerReference = req.params.customerReference;
    const customerTransactions = await Transaction.findAll({
      where: {
        reference: customerReference,
      },
    });

    if (customerTransactions === null) {
      res.status(200).json(null);
    }

    res.status(200).json(customerTransactions);
  } catch (error) {
    console.error(
      "No fue posible encontrar la referencia de la transaccion" + error
    );
    res.status(200).json(null);
  }
};

const createTransactionByStripeCharge = async (domain, charge) => {
  const transaction = await db.sequelize.transaction();
  try {
    const transactionSaved = await Transaction.create(
      {
        domain: domain,
        chargeId: charge?.id,
        amount: charge?.amount,
        amount_captured: charge?.amount_captured,
        amount_refunded: charge?.amount_refunded,
        balance_transaction: charge?.balance_transaction,
        description: charge?.description,
        paid: charge?.paid,
        payment_method: charge?.payment_method,
        receipt_email: charge?.receipt_email,
        refunded: charge?.refunded,
        status: charge?.status,
        created: charge?.created,
        currency: charge?.currency,
        merchant_amount: charge?.merchant_amount,
        merchant_currency: charge?.merchant_currency,
        reference: charge?.reference || null,
        description: charge?.description,
      },
      { transaction: transaction }
    );

      await transaction.commit();

    return transactionSaved;
  } catch (error) {
    console.log("Ocurrio un error al crear la transacción: " + error);
    await transaction.rollback();
    return null;
  }
};

const readTransactionById = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;
    const transaction = await Transaction.findOne({
        where:{
            id: transactionId
        }
    });

    res.status(200).json(transaction);
  } catch (error) {
    console.log("Ocurrio un error al obtener la transacción: " + error);
    res.status(200).json(null);
  }
};
const readTransactionByDomain = async (req, res) => {
    try {
        const domain = req.params.domain;
        const customerTransactions = await Transaction.findAll({
            where: {
                domain: domain,
            },
            order: [['created', 'DESC']]
        });

        if (customerTransactions === null) {
            res.status(200).json(null);
        }

        res.status(200).json(customerTransactions);
    } catch (error) {
        console.error("No fue posible encontrar la customer ID: " + error);
        res.status(200).json(null);
    }
};

const readLastPaymentTransaction = async (req, res) => {
  try {
    const domain = req.params.domain;
    const lastTransaction = await Transaction.findOne({
      where: {
        domain: domain,
      },
      order: [['created', 'DESC']],
    })
    
    return res.status(200).json(lastTransaction);
  } catch (error) {
    console.log("Error al obtener el último pago: ", error);
    return res.status(200).json(null);
  }
};

//* Reads the last three transactions saved in database 
const readLastThreePaymentsByDomain = async (req, res) => {
  try {
    const domain = req.params.domain;
    const lastThreeTransactions = await Transaction.findAll({
      limit: 3,
      where: {
        domain: domain,
      },
      order: [['created', 'DESC']],
    })
    
    return res.status(200).json(lastThreeTransactions);
  } catch (error) {
    console.log("Error al obtener las últimas tres transacciones de la base de datos.");
    return res.status(200).json(null);
  }
}

module.exports = {
  createTransaction,
  readTransaction,
  readTransactionCustomerReference,
  readTransactionByDomain,
  createTransactionByStripeCharge,
  readTransactionById,
  readLastPaymentTransaction,
  readLastThreePaymentsByDomain,
};
