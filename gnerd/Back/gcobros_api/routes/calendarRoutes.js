const express = require("express");
const router = express.Router();

const { getAllCalendars } = require("../controllers/calendarApiController");

router.get("/calendars", getAllCalendars);

module.exports = router;