const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json(handleErrorResponse({ message: 'Token no válido' }));
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json(handleErrorResponse({ message: 'Acceso denegado. No se encontró token.' }));
    }
};

module.exports = {
    verifyJWT
}