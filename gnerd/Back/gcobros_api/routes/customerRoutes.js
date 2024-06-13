const express = require('express');
const router = express.Router();

const {
    getCustomers
} = require("../controllers/customers/customerController.js");

router.get("/", getCustomers);

module.exports = router;