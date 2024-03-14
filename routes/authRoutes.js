const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication
router.post('/login', authController.InicioSesion);
router.post('/register', authController.Registro);

module.exports = router;
