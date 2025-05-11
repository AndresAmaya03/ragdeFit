const { BiometriaHistorica } = require('../models');

// Obtener historial biométrico
exports.getHistorial = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const historial = await BiometriaHistorica.findAll({
      where: { usuario_id },
      order: [['fecha', 'DESC']],
    });

    res.json(historial);
  } catch (err) {
    console.error('Error al obtener historial:', err);
    res.status(500).json({ error: 'Error al obtener historial biométrico' });
  }
};

// Agregar nueva entrada biométrica
exports.addBiometria = async (req, res) => {
  const { usuario_id, peso, estatura, grasa_corporal } = req.body;

  if (!usuario_id || !peso || !estatura || !grasa_corporal) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const nuevaBiometria = await BiometriaHistorica.create({
      usuario_id,
      peso: parseFloat(peso),
      estatura: parseFloat(estatura),
      grasa_corporal: parseFloat(grasa_corporal),
      fecha: new Date(),
    });

    res.status(201).json(nuevaBiometria);
  } catch (err) {
    console.error('Error al guardar biometría:', err);
    res.status(500).json({ error: 'Error al guardar datos biométricos' });
  }
};

