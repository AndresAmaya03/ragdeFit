const { Usuario } = require('../models');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (!usuarios.length) {
      return res.status(404).json({ error: 'No se encontraron usuarios' });
    }
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ where: { id: req.params.usuario_id } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar un usuario por nombre
exports.getUsuarioByName = async (req, res) => {
  try {
    const nombre = req.query.nombre;  // Obtenemos el nombre desde el query
    const usuario = await Usuario.findOne({ where: { nombre: nombre } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

