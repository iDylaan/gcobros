const express = require('express');
const router = express.Router();

const {
    createAdmin
} = require("../controllers/admins/adminsController.js");

router.post("/create", createAdmin);

module.exports = router;