const express = require('express');
const router = express.Router();

const {
    getCustomersFromGoogleWorkspace
} = require("../controllers/resellerApiController.js");

router.get("/", getCustomersFromGoogleWorkspace);

module.exports = router;