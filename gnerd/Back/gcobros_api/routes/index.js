const { Router } = require('express');
const router = Router();


//all routes in routes folder
const TestApi = require('./test_api');
const subscriptionApi = require("./subscriptionRoutes")
const productApi = require("./productRoutes");
const transactionApi = require("./transactionRoutes");
const stripeApi = require("./stripeRoutes");
const customerApi = require("./customerRoutes");
const directoryApi = require('./directoryRoutes');
const adminApi = require('./adminRoutes');
const calendarApi = require("./calendarRoutes");

//endPoints
router.use('/api/test', TestApi);
router.use('/api/admin', adminApi);
router.use('/api/subscriptions', subscriptionApi);
router.use('/api/products', productApi);
router.use('/api/transactions', transactionApi);
router.use('/api/stripe', stripeApi);
router.use('/api/directory', directoryApi);
router.use('/api/customers', customerApi);
router.use('/api/calendar', calendarApi);

module.exports = router;