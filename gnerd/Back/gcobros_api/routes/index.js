const { Router } = require('express');
const router = Router();

//all routes in routes folder
const TestApi = require('./test_api');
const subscriptionApi = require("./subscriptionRoutes")
const productApi = require("./productRoutes");
const transactionApi = require("./transactionRoutes");
const stripeApi = require("./stripeRoutes");

//endPoints
router.use('/api/test', TestApi);
router.use('/api/subscriptions', subscriptionApi);
router.use('/api/products', productApi);
router.use('/api/transactions', transactionApi);
router.use('/api/stripe', stripeApi);

module.exports = router;