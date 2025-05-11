const express = require('express');
const router = express.Router();
const { getUsuarios, getUsuarioById, getUsuarioByName } = require('../controllers/usuarioController');

// Ruta para obtener todos los usuarios
router.get('/', getUsuarios);

// Ruta para obtener un usuario por su ID
router.get('/:usuario_id', getUsuarioById);

// Ruta para buscar un usuario por su nombre
router.get('/search', getUsuarioByName);

module.exports = router;

