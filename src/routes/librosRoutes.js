const express = require('express');
const router = express.Router();
const { consultarLibrosPorCategoria, crearLibro, consultarTodosLibros } = require('../controllers/librosController');
const verificarToken = require('../middleware/verificarToken');

router.post('/crearLibro', verificarToken, crearLibro);
router.get('/consultaLibros', consultarTodosLibros);
router.get('/librosPorCategoria/:categoria', verificarToken, consultarLibrosPorCategoria);

module.exports = router;
