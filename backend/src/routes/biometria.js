const express = require('express');
const router = express.Router();
const biometriaController = require('../controllers/biometriaController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, biometriaController.addBiometria); // ← solo '/'
router.get('/:usuario_id', authenticateToken, biometriaController.getHistorial);

module.exports = router;
