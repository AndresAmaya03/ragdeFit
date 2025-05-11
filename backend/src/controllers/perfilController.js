const { Perfil } = require('../models');

exports.getPerfil = async (req, res) => {
  try {
    const perfil = await Perfil.findOne({ where: { usuario_id: req.params.usuario_id } });
    if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });

    res.json(perfil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePerfil = async (req, res) => {
  const { usuario_id, objetivo, preferencias_ejercicio } = req.body;

  try {
    const [perfil, created] = await Perfil.upsert({
      usuario_id,
      objetivo,
      preferencias_ejercicio
    }, { returning: true });

    res.json({ message: created ? 'Perfil creado' : 'Perfil actualizado', perfil });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

