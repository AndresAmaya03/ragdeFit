const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Rutina', {
    usuario_id: {
      type: DataTypes.INTEGER,
      references: { model: 'usuario', key: 'id' },
      onDelete: 'CASCADE'
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    descripcion: DataTypes.TEXT,
    detalles: {
      type: DataTypes.JSONB,
      allowNull: false
    }
  }, {
    tableName: 'rutina',
    timestamps: false
  });
};

