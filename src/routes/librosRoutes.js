const express = require('express');
const router = express.Router();
const {consultarLibrosPorCaracteristica} = require('../controllers/librosController');
const {crearLibro} = require('../controllers/librosController');
const {consultarTodosLibros} = require('../controllers/librosController');

const verificarToken = require('../middleware/verificarToken');

router.post('/crearLibro', verificarToken, crearLibro);
router.get('/consultaLibros', consultarTodosLibros);
router.get('/librosCategoria', consultarLibrosPorCaracteristica);

module.exports = router;
