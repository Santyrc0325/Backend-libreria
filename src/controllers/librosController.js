const Libro = require('../models/libro');

exports.crearLibro = async (req, res) => {
    try {
        const libro = new Libro(req.body);
        await libro.save();
        res.status(201).json(libro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.consultarTodosLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.consultarLibrosPorCaracteristica = async (req, res) => {
    try {
        const query = {};
        const { precio, editorial, autor, fecha, categoria, idioma, formato } = req.query;

        if (precio) query.precio = precio;
        if (editorial) query.editorial = editorial;
        if (autor) query.autor = autor;
        if (fecha) query.fecha = fecha;
        if (categoria) query.categoria = categoria;
        if (idioma) query.idioma = idioma;
        if (formato) query.formato = formato;

        const libros = await Libro.find(query);
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
