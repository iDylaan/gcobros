const express = require('express');
const router = express.Router();

const {
    createAdmin,
    validateIsValidAdmin
} = require("../controllers/admins/adminsController.js");

router.post("/create", createAdmin);
router.post('/validate', validateIsValidAdmin)

module.exports = router;