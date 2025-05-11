const express = require('express');
const router = express.Router();
const { getPerfil, updatePerfil } = require('../controllers/perfilController');

router.get('/:usuario_id', getPerfil);
router.post('/', updatePerfil);

module.exports = router;

