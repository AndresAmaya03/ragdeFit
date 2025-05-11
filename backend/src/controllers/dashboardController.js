const { Usuario, BiometriaHistorica, SesionEjercicio, Rutina } = require('../models');

exports.getDashboard = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const biometria = await BiometriaHistorica.findOne({
      where: { usuario_id },
      order: [['fecha', 'DESC']],
    });

    const sesiones = await SesionEjercicio.findAll({
      where: { usuario_id },
    });

    const totalCalorias = sesiones.reduce((acc, s) => acc + (s.calorias_quemadas || 0), 0);
    const totalDuracion = sesiones.reduce((acc, s) => acc + (s.duracion_min || 0), 0);

    const rutina = await Rutina.findOne({
      where: { usuario_id },
      order: [['fecha_creacion', 'DESC']],
    });

    res.json({
      usuario_id,
      biometria_actual: biometria,
      resumen_sesiones: {
        total_calorias: totalCalorias,
        total_duracion: totalDuracion,
      },
      ultima_rutina: rutina,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

