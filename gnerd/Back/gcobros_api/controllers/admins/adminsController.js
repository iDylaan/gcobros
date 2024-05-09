const db = require("../../models/index");
const { handleResponse, handleErrorResponse } = require("../utils/misc.js");
const { getUserByEmail } = require('../directoryApiController.js');
const { Admin } = require('../../models/index');


const createAdmin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json(handleErrorResponse({ message: 'El correo electrónico es requerido.' }));
        }

        // Validar si el usuario ya esta registrado en el sistema
        const transaction = await db.sequelize.transaction();
        const userInDB = await Admin.findOne({ where: { primaryEmail: email } });
        console.log(userInDB);


        if (!userInDB) {
            const user = await getUserByEmail(email);

            if (!user) {
                return res.status(400).json(handleErrorResponse({ message: 'El correo electrónico no es válido.' }));
            }

            // Crear al nuevo administrador dentro de la base de datos
            const newAdmin = await Admin.create({
                adminName: user.name.fullName,
                directoryUserId: user.id,
                customerId: user.customerId,
                kind: user.kind,
                primaryEmail: user.primaryEmail,
                suspended: user.suspended
            },{ transaction: transaction });
            // ALL OK
            res.json(handleResponse(user));
            await transaction.commit();
        } else {
            res.status(400).json(handleErrorResponse({ message: 'El correo electrónico ya está registrado en el sistema.' }))
        }
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        res.status(500).json(handleErrorResponse({ message: "Error interno del servidor" }));
    }
}


const validateIsValidAdmin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json(handleErrorResponse({ message: 'El correo electrónico es requerido.' }));
        }
        const userInDB = await Admin.findOne({ where: { primaryEmail: email, suspended: false } });
        if (!userInDB) {
            res.status(400).json(handleErrorResponse({ message: 'Administrador no válido.' }));
        } else {
            res.json(handleResponse(userInDB));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(handleErrorResponse({ message: "Error interno del servidor" }));
    }
}

module.exports = {
    createAdmin,
    validateIsValidAdmin
};