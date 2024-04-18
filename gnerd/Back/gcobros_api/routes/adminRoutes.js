const express = require("express");
const router = express.Router();

const {
    signinAdmin,
    createAdmin
} = require("../controllers/admins/adminController");

router.post("/signin", signinAdmin);
router.post("/create", createAdmin);


module.exports = router;
