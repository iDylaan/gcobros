const express = require("express");
const router = express.Router();

const {
    createTransaction,
    readTransaction,
    //------------------------//
    readTransactionCustomerReference,
    readTransactionById,
    readTransactionByDomain,
    readLastPaymentTransaction,
    readLastThreePaymentsByDomain,
} = require("../controllers/transactionController");

router.post("/", createTransaction);
router.get("/", readTransaction);
router.get("/reference/:customerReference", readTransactionCustomerReference);
router.get("/id/:transactionId", readTransactionById);
router.get("/by-domain/:domain", readTransactionByDomain);
router.get("/last-payment/:domain", readLastPaymentTransaction);
router.get("/last-transactions/by-domain/:domain", readLastThreePaymentsByDomain)


module.exports = router;

