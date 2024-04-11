const Usuario = require('../models/usuario'); // Asegúrate de que la ruta al modelo de Usuario sea correcta
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'libreriaFibonnacci123';

exports.registrarUsuario = async (req, res) => {
    try {
        if (!req.body.rol || (req.body.rol !== 'comprador' && req.body.rol !== 'vendedor')) {
            return res.status(400).json({ mensaje: "El rol especificado es inválido" });
        }

        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ mensaje: "El documento ya está registrado" });
        } else {
            res.status(500).json({ mensaje: "Error al registrar el usuario", error: error.message });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const { documento, contraseña } = req.body;
        let usuario = await Usuario.findOne({ documento });

        if (!usuario || !(await usuario.compararContraseña(contraseña))) {
            return res.status(401).json({ mensaje: "Documento o contraseña incorrectos" });
        }

        const token = jwt.sign({ id: usuario._id, role: usuario.rol }, SECRET_KEY, { expiresIn: '1d' });

        res.json({ mensaje: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al intentar el login", error: error.message });
    }
};
