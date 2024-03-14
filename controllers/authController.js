const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const { queryAsync } = require('../models/dbModel');
//const { verifyToken } = require('../middlewares/authMiddleware');

const JWT_SECRET_KEY = crypto.randomBytes(32).toString('hex');

// Ruta para Iniciar Sesion
async function InicioSesion(req, res) {
    const { username, password } = req.body;

    const results = await queryAsync('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length === 0 || !await bcrypt.compare(password, results[0].password)) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const user = { id: results[0].id, username: results[0].username };
    const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '1h' });

    console.log('Token generado', token);
    res.status(200).json({ token });
}

// Ruta para Registrar nuevo usuario
async function Registro(req, res) {
    const usuario = req.body;

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(usuario.password, 10);
    usuario.password = hashedPassword;

    const results = await queryAsync('INSERT INTO users (username, email, password, name, last_name, date_birth, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [usuario.username, usuario.email, usuario.password, usuario.name, usuario.last_name, usuario.date_birth, usuario.phone]);

    console.log('Usuario registrado con éxito');
    res.status(201).json({ message: 'Usuario registrado con éxito' });
}

module.exports = {
    //verifyToken,
    InicioSesion,
    Registro,
}
