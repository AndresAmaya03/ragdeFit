const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  return sequelize.define(
    'Usuario',
    {
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      contraseña_hash: { type: DataTypes.STRING, allowNull: false },
      nombre: { type: DataTypes.STRING, allowNull: false },
      fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: false },
      fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      biometria_inicial: { type: DataTypes.JSONB },
    },
    {
      tableName: 'usuario',
      timestamps: false,
    },
  );
};
