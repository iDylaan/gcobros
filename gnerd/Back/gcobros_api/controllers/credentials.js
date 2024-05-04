const { google } = require("googleapis");

function getCredentials(scopes) {
    const auth = new google.auth.GoogleAuth({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS_PATH,
        scopes,
        clientOptions: {
            subject: "iconos@gnerd.mx",
        },
    });

    return auth;
}

module.exports = {
    getCredentials,
}