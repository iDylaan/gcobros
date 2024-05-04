const express = require("express");
const router = express.Router();


const {
    getAllUsersFromDirectory
} = require('../controllers/directory/usersController.js');


router.get("/users", getAllUsersFromDirectory);

module.exports = router;