const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('SesionEjercicio', {
    usuario_id: {
      type: DataTypes.INTEGER,
      references: { model: 'usuario', key: 'id' },
      onDelete: 'CASCADE'
    },
    rutina_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'rutina', key: 'id' },
      onDelete: 'SET NULL'
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    duracion_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calorias_quemadas: DataTypes.INTEGER,
    feedback: DataTypes.TEXT
  }, {
    tableName: 'sesion_ejercicio',
    timestamps: false
  });
};

