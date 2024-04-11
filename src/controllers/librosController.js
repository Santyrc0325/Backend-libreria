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

exports.consultarLibrosPorCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        console.log("Categoría solicitada:", categoria);

        const categoriasPermitidas = [
            'Clásicos', 'Filosofía', 'Biografía', 'Autoayuda', 'Ciencia Ficción',
            'Ciencia', 'Novelas', 'Economía', 'Arte', 'Salud y bienestar', 'Historia', 'Negocios'
        ];

        if (!categoriasPermitidas.includes(categoria)) {
            return res.status(400).json({ error: 'Categoría no permitida' });
        }

        const query = { categoria };
        const libros = await Libro.find(query);
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


