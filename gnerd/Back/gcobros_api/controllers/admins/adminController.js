const db = require("../../models/index");
const { Admin } = require("../../models/index");
const validator = require('validator');
const { handleResponse, handleErrorResponse } = require("../utils/misc.js");

// VALIDATORS

// FUNCTIONS
const createAdmin = async (req, res) => {
    try {
        let { adminName, email, password } = req.body;

        // Validando el formato del correo electrónico
        if (!validator.isEmail(email)) {
            return res.status(400).json(handleErrorResponse({ message: 'El correo electrónico no es válido.' }));
        }

        // Validando el formato de la contraseña (Best practices)
        if (!validator.isLength(password, { min: 8 })) {
            return res.status(400).json(handleErrorResponse({ message: 'La contraseña debe tener al menos 8 caracteres.' }));
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json(handleErrorResponse({ message: 'La contraseña debe tener al menos una mayúscula.' }));
        }
        if (!/\d/.test(password)) {
            return res.status(400).json(handleErrorResponse({ message: 'La contraseña debe tener al menos un dígito.' }));
        }
        if (!/[!@#$%^&*()_,.?":{}|<>]/.test(password)) {
            return res.status(400).json(handleErrorResponse({ message: 'La contraseña debe tener al menos un caracter especial.' }));
        }

        // Sanitizando los datos de entrada
        const sanitizedAdminName = validator.trim(adminName);
        adminName = sanitizedAdminName;
        const sanitizedEmail = validator.normalizeEmail(email);
        email = sanitizedEmail;

        const admin = await Admin.createAdmin({
            'adminName': adminName,
            'email': email,
            password
        });

        console.log(admin);

        return res.status(201).json(handleResponse({
            id: admin.id,
            adminName: admin.adminName,
            email: admin.email
        }));

    } catch (error) {
        return res.status(500).json(handleErrorResponse({ error: error.message }));
    }
};

const signinAdmin = async (req, res) => {
    let { email, password } = req.body;

    try {
        // Validando el formato del correo electrónico y sanitizarlo
        const sanitizedEmail = validator.normalizeEmail(email);
        email = sanitizedEmail;

        if (!validator.isEmail(email)) {
            return res.status(400).json(handleErrorResponse({ message: 'Correo electrónico no válido' }));
        }

        // Obtener el usuario por su correo electrónico
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.status(401).json(handleErrorResponse({ message: "Credenciales incorrectas." }));
        }

        const isValid = await admin.validatePassword(password);

        if (!isValid) {
            return res.status(401).json(handleErrorResponse({ message: "Credenciales incorrectas." }));
        }

        // AUTH OK
        res.json(handleResponse({ message: "Autenticación exitosa", admin: { id: admin.id, email: admin.email } }));

    } catch (error) {
        console.error(error);
        res.status(500).json(handleErrorResponse({ message: "Error interno del servidor" }));
    }
}


module.exports = {
    signinAdmin,
    createAdmin
}