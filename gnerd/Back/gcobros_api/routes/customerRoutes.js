const express = require('express');
const router = express.Router();

const {
    getCustomers,
    getCustomer,
} = require("../controllers/customers/customerController.js");

router.get("/", getCustomers);
router.get("/:idUser", getCustomer);

module.exports = router;