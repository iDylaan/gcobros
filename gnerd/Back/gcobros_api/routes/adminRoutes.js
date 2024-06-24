const express = require('express');
const router = express.Router();

const {
    createAdmin,
    validateIsValidAdmin,
    getAdmins,
    activateAdmin,
    desactivateAdmin
} = require("../controllers/admins/adminsController.js");

router.get("/", getAdmins);
router.post("/create", createAdmin);
router.post('/validate', validateIsValidAdmin)
router.post('/activate', activateAdmin)
router.post('/desactivate', desactivateAdmin)

module.exports = router;