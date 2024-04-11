const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    // Agrega aquí los campos comunes que tenías en tus modelos anteriores
    nombre: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ['comprador', 'vendedor'], required: true }, // Nuevo campo para el rol
    // Otros campos que necesites
});

// Middleware para encriptar la contraseña antes de guardar el usuario
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contraseña')) return next();
    this.contraseña = await bcrypt.hash(this.contraseña, 12);
    next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = async function(contraseñaCandidata) {
    return await bcrypt.compare(contraseñaCandidata, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
