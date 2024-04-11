const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    formato: { type: String, required: true },
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    editorial: { type: String, required: true },
    categoria: [{ 
        type: String, 
        required: true,
        enum: [
            'Clásicos', 
            'Filosofía', 
            'Biografía', 
            'Autoayuda', 
            'Ciencia Ficción', 
            'Ciencia', 
            'Novelas', 
            'Economía', 
            'Arte', 
            'Salud y bienestar', 
            'Historia', 
            'Negocios'
        ] 
    }],
    fecha: {type: String, required: true},
    idioma: { type: String, required: true },
    num_paginas: { type: Number, required: true },
    descripcion: { type: String, required: true },
    score: { type: Number },
    precio: { type: Number, required: true },
});

const Libro = mongoose.model('Libro', libroSchema);
module.exports = Libro;
