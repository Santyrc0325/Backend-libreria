const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({

    nombre: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ['comprador', 'vendedor'], required: true }, 

});


usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contraseña')) return next();
    this.contraseña = await bcrypt.hash(this.contraseña, 12);
    next();
});

usuarioSchema.methods.compararContraseña = async function(contraseñaCandidata) {
    return await bcrypt.compare(contraseñaCandidata, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
