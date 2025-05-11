const express = require('express');
const chatController = require('../controllers/chatController');  // Importamos el controlador
const router = express.Router();

// Ruta para manejar el chat, usaremos el controlador chatController
router.post('/', chatController);

module.exports = router;

