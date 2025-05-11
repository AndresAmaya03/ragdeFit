const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('BiometriaHistorica', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'usuario', key: 'id' },
      onDelete: 'CASCADE'
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    peso: DataTypes.DECIMAL(5, 2),
    estatura: DataTypes.DECIMAL(5, 2),
    grasa_corporal: DataTypes.DECIMAL(5, 2)
  }, {
    modelName: 'BiometriaHistorica', // 👈 este nombre es clave para la importación
    tableName: 'biometria_historica',
    timestamps: false
  });
};

