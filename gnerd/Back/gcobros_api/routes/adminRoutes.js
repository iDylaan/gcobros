const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../controllers/middlewares/jwt.js");

const {
    signinAdmin,
    createAdmin
} = require("../controllers/admins/adminController");


router.post("/signin", signinAdmin);
router.post("/create", verifyJWT, createAdmin);


module.exports = router;
