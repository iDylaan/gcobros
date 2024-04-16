//! GLOBAL API KEY
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_API_KEY);
const { Subscription, Product } = require("../../models/index");
const transactionController = require("../transactionController");
const { sendSuccessfulPayment } = require("../sendEmail/sendEmailController");

//* Create a customer
const createStripeCustomer = async (req, res) => {
  try {
    const { customerEmail, paymentRequest } = req.body;
    const domain = customerEmail.split("@").pop();

    //Parsing a serialized HTML-safe string as an JSON object
    const token = JSON.parse(
      paymentRequest.paymentMethodData.tokenizationData.token
    );

    // Getting all subscriptions, example: All subcription from "ïconos.mx"
    const subscriptions = await Subscription.findAll({
      where: {
        customerDomain: domain,
      },
    });

    let totalToPay = 0.0;

    const customerInformation = await Promise.all(
      subscriptions.map(async (subscription) => {
        totalToPay += subscription.totalToPay;

        const product = await Product.findOne({
          where: {
            skuId: subscription.skuId,
          },
        });

        return {
          id: subscription.id,
          productName: product.productName,
          lisencesNumber: subscription.seats_licensedNumberOfSeats,
          totalToPay: subscription.totalToPay,
        };
      })
    );

    const charge = await stripe.charges.create({
      amount: ((totalToPay * 1.16) * 100),
      currency: "mxn",
      source: token.id,
      description:
        `Pago de ${totalToPay *1.16} del dominio ${domain}`,
    });

    sendSuccessfulPayment({customerEmail: customerEmail, totalPrice: totalToPay * 1.16});
    // Save charge in databae as an transaction
    const transaction = await transactionController.createTransactionByStripeCharge(domain, charge);

    res.status(200).json(transaction);
  } catch (error) {
    console.error(
      "Ocurrio un error al intentar crear el cargo en Stripe, intentalo más tarde:\n\n",
      error
    );
    res.status(500).json(null);
  }
};

const createChargeInStripe = async (requiredInfo) => {
  try {
  } catch (error) {
    console.error(
      "Ocurrio un error al realizar la petición a Stripe: \n" + error
    );
  }
};

const createPaymentSecret = async (req, res) => {
  const { clientSecret } = await stripe.paymentIntents.create({
    amount: totalToPay,
    currency: "mxn",
    automatic_payment_methods: { enabled: false },
  });

  if (!paymentIntent) {
    return res.status(200).json(null);
  }

  return res.status(200).json(paymentIntent);
};

module.exports = {
  createStripeCustomer,
};
