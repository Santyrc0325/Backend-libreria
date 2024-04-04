const Comprador = require('../models/comprador');
const Vendedor = require('../models/vendedor');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'libreriaFibonnacci123';

exports.registrarComprador = async (req, res) => {
    
        const nuevoComprador = new Comprador(req.body);
        await nuevoComprador.save();
        res.status(201).json({ mensaje: "Comprador registrado exitosamente" });

};

exports.registrarVendedor = async (req, res) => {
            
           const nuevoVendedor = new Vendedor(req.body);
           await nuevoVendedor.save();
           res.status(201).json({ mensaje: "Vendedor registrado exitosamente" });
        
};

exports.login = async (req, res) => {

        const { documento, contraseña } = req.body;
        let usuario = await Comprador.findOne({ documento }) || await Vendedor.findOne({ documento });

        if (!usuario || !(await usuario.compararContraseña(contraseña))) {
            console.log(`Usuario no encontrado con documento: ${documento}`);
            return res.status(401).json({ mensaje: "Documento incorrecto" });
        }

        const esContraseñaCorrecta = await usuario.compararContraseña(contraseña);
        console.log(`Comparación de contraseña: ${esContraseñaCorrecta}`);
        if (!esContraseñaCorrecta) {
        return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: usuario._id, role: usuario instanceof Comprador ? 'comprador' : 'vendedor' }, SECRET_KEY, { expiresIn: '1d' });

        res.json({ mensaje: "Login exitoso", token });

};
