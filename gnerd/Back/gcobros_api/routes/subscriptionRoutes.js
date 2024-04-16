const express = require("express");
const router = express.Router();
const {
  createSubscription,
  readSubscription,
  updateSubscription,
  deleteSubscription,
  //------------------------//
  readSubscriptionsFromGoogle,
  readSubscriptionByCustomerId,
  readAllAllowedDomains,
  readSubscriptionsByCustomerDomain,
} = require("../controllers/subscriptions/subscriptionController");

// => /api/subscriptions
router.post("/", createSubscription);
router.get("/", readSubscription);
router.put("/", updateSubscription);
router.delete("/", deleteSubscription);
router.get("/update-google-api", readSubscriptionsFromGoogle);
router.get("/customer/:customerId", readSubscriptionByCustomerId);
router.get("/domains", readAllAllowedDomains);
router.get("/customer-domain/:customerDomain", readSubscriptionsByCustomerDomain);

module.exports = router;