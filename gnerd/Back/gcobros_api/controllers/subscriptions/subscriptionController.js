const db = require("../../models/index");
const {
  Subscription,
  Product,
} = require("../../models/index");
const {
  getAllSubscriptionsFromGoogleWorkspace,
} = require("../resellerApiController");

const createSubscription = async (req, res) => {
  try {
    let subscription = req.body;
    subscription = await Subscription.create(subscription);
    res.send(subscription);
  } catch (error) {
    res.send(null);
  }
};

const getAllSubscriptions = async () => {
  try {
    const subscriptions = await Subscription.findAll();
    return subscriptions;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const readSubscription = async ({ res }) => {
  try {
    let subscriptions = await Subscription.findAll();
    res.send(subscriptions);
  } catch (error) {
    res.send(null);
  }
};

const updateSubscription = async (req, res) => {
  try {
    let newSubscription = req.body;
    let oldSubscription = await Subscription.findByPk(newSubscription.id);
    oldSubscription.update(newSubscription);
    res.send(oldSubscription);
  } catch (error) {
    res.send(null);
  }
};

const deleteSubscription = async (req, res) => {
  try {
    let subscription = req.body;
    subscription.status = "INACTIVE";

    let oldSubscription = await oldSubscription.findByPk(subscription.id);
    oldSubscription.update(subscription);
    res.json(oldSubscription);
  } catch (error) {
    res.send(null);
  }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  //

const readSubscriptionByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customerSubscriptions = await Subscription.findAll({
      where: {
        customerId: customerId,
      },
    });

    // IF NOT FOUND
    if (customerSubscriptions === null) {
      res.status(200).json(null);
    }

    res.status(200).json(customerSubscriptions);
  } catch (error) {
    console.error("No fue posible obtener las subscripciones del usuario.");
    res.status(200).json(null);
  }
};

const readSubscriptionsByCustomerDomain = async (req, res) => {
  try {
    const customerDomain = req.params.customerDomain;
    const customerSubscriptions = await Subscription.findAll({
      where: {
        customerDomain: customerDomain,
      },
    });

    if (customerSubscriptions === null) {
      return res.status(200).json(null);
    }

    return res.status(200).json(customerSubscriptions);
  } catch (error) {
    return res.status(200).json(null);
  }
};

const readSubscriptionsFromGoogle = async ({ res }) => {
  const subscriptions = await getAllSubscriptionsFromGoogleWorkspace();

  //! SAVE ALL PRODUCTS IN DATABASE
  // createProductsInDatabase(subscriptions);

  //! SAVE ALL SUBSCRIPTIONS IN DATABASE
  createSubscriptionsInDatabase(subscriptions);

  res.status(200).json("Database updated");
};

const createSubscriptionsInDatabase = async (subscriptions) => {
  const transaction = await db.sequelize.transaction();

  try {
    for (const sub of subscriptions) {

      if (await validateExistSubscription(sub)) {
        continue;
      }

      await Subscription.create(
        {
          customerId: sub.customerId,
          subscriptionId: sub.subscriptionId,
          skuId: sub.skuId,
          creationTime: sub.creationTime,
          seats_kind: sub.seats?.kind,
          seats_numberOfSeats: sub.seats?.numberOfSeats,
          seats_licensedNumberOfSeats: sub.seats?.licensedNumberOfSeats,
          seats_maximumNumberOfSeats: sub.seats?.maximumNumberOfSeats,
          renewalSettings_kind: sub.renewalSettings?.kind,
          renewalSettings_renewalType: sub.renewalSettings?.renewalType,
          totalToPay: sub.seats?.licensedNumberOfSeats * await readProductPriceBySkuId(sub.skuId),
          alreadyPay: false,
          purchaseOrderId: sub.purchaseOrderId,
          status: sub.status,
          resourceUiUrl: sub.resourceUiUrl,
          billingMethod: sub.billingMethod, 
          customerDomain: sub.customerDomain,
          dealCode: sub.dealCode,
          skuName: sub.skuName,
          plan_planName: sub.plan?.planName,
          plan_isCommitmentPlan: sub.plan?.isCommitmentPlan,
          plan_commitmentInterval_startTime:
            sub.plan?.commitmentInterval?.startTime,
          plan_commitmentInterval_endTime:
            sub.plan?.commitmentInterval?.endTime,
          trialSettings_isInTrial: sub.trialSettings?.isInTrial,
          trialSettings_trialEndTime: sub.trialSettings?.trialEndTime,
          transferInfo_transferabilityExpirationTime:
            sub.transferInfo?.transferabilityExpirationTime,
          transferInfo_minimumTransferableSeats:
            sub.transferInfo?.minimumTransferableSeats,
          transferInfo_currentLegacySkuId: sub.transferInfo?.currentLegacySkuId,
        },
        { transaction: transaction }
      );
    }
    await transaction.commit();
  } catch (error) {
    // Revert changes
    console.log(
      "Ocurrio un problema al intentar guardar las subscripciones: " + error
    );
    await transaction.rollback();
  }
};

const readProductPriceBySkuId = async (skuId) => {
  const { monthlyPrice: productPrice } = await Product.findOne({
    where: {
      skuId: skuId,
    }
  });

  if (productPrice == null || productPrice == undefined) {
    return 0;
  }
  return productPrice;
}

async function validateExistSubscription(sub) {
  const subscription = await Subscription.findOne({
    where: {
      customerId: sub?.customerId,
      skuId: sub?.skuId,
    },
  });

  if (subscription === null) {
    return false;
  }

  // Si la subscripcion es diferente a la que esta almacenada en base de datos,
  // quiere decir que se actualizó y necesita ser actualizada en base de datos tambien.
  if (subscription.subscriptionId != sub.subscriptionId) {
    updateSubscriptionLocal({ oldSubscription: subscription, newSubscription: sub });
    return true;
  }

  return true;
}

const updateSubscriptionLocal = async ({ oldSubscription, newSubscription }) => {
  try {

    if (oldSubscription.alreadyPay == true) {
      newSubscription.alreadyPay = true;
    }

    oldSubscription.update(newSubscription);
  } catch (error) {
    console.log("Error al actualizar la subscripcion: " + error);
  }
}

async function createCustomerSubscriptions(subscriptions) {
  const transaction = await db.sequelize.transaction();
  try {
    for (const sub of subscriptions) {
      let subscriptionIdList = [];

      if (
        subscriptionIdList.includes(sub.subscriptionId) ||
        (await validateExistCustomerSubscription(sub.subscriptionId))
      ) {
        continue;
      }

      await CustomerSubscription.create({
        customerId: sub.customerId,
        subscriptionId: sub.subscriptionId,
        skuId: sub.skuId,
        seats_licensedNumberOfSeats: sub?.seats?.licensedNumberOfSeats || 0,
        totalToPay: await getTotalPayment(
          sub.skuId,
          sub?.seats?.licensedNumberOfSeats || 0,
          sub.plan?.planName
        ),
        alreadyPaid: false,
        planName: sub.plan?.planName,
        customerDomain: sub.customerDomain,
        status: sub.status,
      });

      subscriptionIdList.push(sub.subscriptionId);
    }

    await transaction.commit();
  } catch (error) {
    console.log("Error al asignar las subscripciones al usuario: " + error);
    await transaction.rollback();
  }
}

async function validateExistCustomerSubscription(subscriptionId) {
  try {
    const customerSubscription = await CustomerSubscription.findOne({
      where: {
        subscriptionId: subscriptionId,
      },
    });

    if (customerSubscription === null) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error al intentar obtener el customer subscription: " + error);
  }
}

async function getTotalPayment(skuId, licenses, planName) {
  try {
    const product = await Product.findOne({
      where: {
        skuId: skuId,
      },
    });

    if (product === null) {
      return 0.0;
    }

    let totalPrice = 0.0;
    if (planName == "ANNUAL") {
      totalPrice = licenses * product.yearlyPrice;
      return totalPrice;
    } else {
      totalPrice = licenses * product.monthlyPrice;
      return totalPrice;
    }
  } catch (error) {
    console.log("Error al asignar: " + error);
    return 0.0;
  }
}

// returns all customer domains
async function readAllAllowedDomains({ res }) {
  try {
    const allAllowedDomains = await Subscription.findAll({
      attributes: [
        db.Sequelize.fn("DISTINCT", db.Sequelize.col("customerDomain")),
        "customerDomain",
      ],
    });

    if (allAllowedDomains === null) {
      res.status(200).json(null);
    }

    res.status(200).json(allAllowedDomains);
  } catch (error) {
    console.log("Ocurrio un error" + error);
    res.status(200).json(null);
  }
}

const readSubscriptionAndProducts = async (req, res) => {
  try {
    const data = await Subscription.findAll({
      include: [
        {
          model: Product,
          where: {},
        },
      ],
    });
  } catch (error) {
    console.log("Error al obtener " + error);
    res.status(200).json(null);
  }
};

module.exports = {
  createSubscription,
  readSubscription,
  updateSubscription,
  deleteSubscription,
  readSubscriptionsFromGoogle,
  readSubscriptionByCustomerId,
  readAllAllowedDomains,
  readSubscriptionsByCustomerDomain,
  createSubscriptionsInDatabase,
  getAllSubscriptions
};
