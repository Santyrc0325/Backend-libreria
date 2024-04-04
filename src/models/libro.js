const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    editorial: { type: String, required: true },
    categoria: { type: String, required: true },
    fecha: {type: String, required: true},  
    score: { type: Number },
    precio: { type: Number, required: true },
});

const Libro = mongoose.model('Libro', libroSchema);
module.exports = Libro;
