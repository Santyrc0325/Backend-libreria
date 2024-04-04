const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const vendedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    documento: { type: String, required: true, unique: true },
    celular: { type: String, required: true },
    contraseña: { type: String, required: true }
});

vendedorSchema.pre('save', async function (next) {
    if (this.isModified('contraseña') || this.isNew) {
        const hash = await bcrypt.hash(this.contraseña, 10);
        this.contraseña = hash;
    }
    next();
});

vendedorSchema.methods.compararContraseña = async function (contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};

const Vendedor = mongoose.model('Vendedor', vendedorSchema);

module.exports = Vendedor;
