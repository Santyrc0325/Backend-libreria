const jwt = require('jsonwebtoken');
const SECRET_KEY = 'libreriaFibonnacci123';

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({ mensaje: "No autorizado" });
    }
};