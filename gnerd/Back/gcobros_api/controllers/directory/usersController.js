const { handleResponse, handleErrorResponse } = require("../utils/misc.js");
const { getAllUsers } = require('../directoryApiController.js');

const getAllUsersFromDirectory = async (req, res) => {
    try {
        const users = await getAllUsers();
        // AUTH OK
        res.json(handleResponse(users));
    } catch (error) {
        console.error(error);
        res.status(500).json(handleErrorResponse({ message: "Error interno del servidor" }));
    }
}

module.exports = {
    getAllUsersFromDirectory,
};