const express = require("express");
const router = express.Router();

const {
    createStripeCustomer,
} = require("../controllers/stripe/stripeController");

router.post("/", createStripeCustomer);

module.exports = router;