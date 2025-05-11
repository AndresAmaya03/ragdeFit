const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('ModeloIA', {
    version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataset: DataTypes.STRING,
    fecha_entrenamiento: DataTypes.DATE,
    precision: DataTypes.DECIMAL(5, 2)
  }, {
    tableName: 'modelo_ia',
    timestamps: false
  });
};

