const { google } = require("googleapis");
const { getCredentials } = require("./credentials.js");

const SCOPES = [
    "https://www.googleapis.com/auth/admin.directory.user",
    "https://www.googleapis.com/auth/siteverification",
];


const getAllUsers = async () => {
    try {
        const auth = getCredentials(SCOPES);

        const directory = google.admin({ version: 'directory_v1', auth });

        let response = await directory.users.list({
            customer: 'my_customer',
            orderBy: 'email',
        });

        let allUsers = response.data.users;
        return allUsers;
    } catch (error) {
        console.log("Error al obtener los usuarios: " + error);
        return null;
    }
}

const getUserByEmail = async (email) => {
    try {
        const auth = getCredentials(SCOPES);
        const directory = google.admin({ version: 'directory_v1', auth });

        const user = await directory.users.get({
            userKey: email,
        });

        return user.data;
    } catch (error) {
        console.log("Error al obtener los usuarios: " + error);
        return null;
    }
}


module.exports = {
    getAllUsers,
    getUserByEmail
}