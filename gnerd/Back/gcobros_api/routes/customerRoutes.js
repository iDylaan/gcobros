const express = require('express');
const router = express.Router();
const { verifyJWT } = require("../controllers/middlewares/jwt.js");

const {
    getCustomersFromGoogleWorkspace
} = require("../controllers/resellerApiController.js");

router.get("/", verifyJWT, getCustomersFromGoogleWorkspace);

module.exports = router;