const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('RedSocial', {
    usuario_id: {
      type: DataTypes.INTEGER,
      references: { model: 'usuario', key: 'id' },
      onDelete: 'CASCADE'
    },
    plataforma: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token_acceso: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ultima_sincronizacion: DataTypes.DATE
  }, {
    tableName: 'red_social',
    timestamps: false
  });
};

