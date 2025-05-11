const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Perfil', {
    usuario_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    objetivo: {
      type: DataTypes.ENUM('perder_peso', 'ganar_musculo', 'mantenimiento'),
      allowNull: true
    },
    preferencias_ejercicio: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    ultima_actualizacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'perfil_usuario',
    timestamps: false
  });
};

