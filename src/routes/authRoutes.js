const express = require('express');
const router = express.Router();
const {registrarComprador} = require('../controllers/authController');
const {login} = require('../controllers/authController');
const {registrarVendedor} = require('../controllers/authController');

router.post('/registrarComprador', registrarComprador);
router.post('/registrarVendedor', registrarVendedor);
router.post('/login', login);

module.exports = router;
