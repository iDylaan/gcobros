const { google } = require("googleapis");
const { getCredentials } = require("./credentials.js");
const { handleResponse, handleErrorResponse } = require("./utils/misc.js");


const SCOPES = [
    "https://www.googleapis.com/auth/calendar.events.readonly",
    "https://www.googleapis.com/auth/siteverification",
];


const getAllCalendars = async (req, res) => {
    try {
        const auth = getCredentials(SCOPES);
        const calendar = google.calendar({ version: 'v3', auth });
        const calendars = await calendar.events.list({
            calendarId: 'gnerd.mx_188e5oitkfmekhb3g1cetq7gmcnes@resource.calendar.google.com',
            orderBy: 'startTime',
            singleEvents: true,
            timeMin: (new Date()).toISOString(),
        });
        res.json(handleResponse(calendars))
    } catch (error) {
        console.log("Error al obtener los calendarios: " + error);
        res.status(500).json(handleErrorResponse({ message: error }));
    }
}

module.exports = {
    getAllCalendars
}