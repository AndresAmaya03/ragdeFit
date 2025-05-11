const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port,
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Usuario = require('./Usuario')(sequelize);
db.Perfil = require('./Perfil')(sequelize);
db.BiometriaHistorica = require('./BiometriaHistorica')(sequelize);
db.SesionEjercicio = require('./SesionEjercicio')(sequelize);
db.Rutina = require('./Rutina')(sequelize);
db.RedSocial = require('./RedSocial')(sequelize);
db.ModeloIA = require('./ModeloIA')(sequelize);

module.exports = db;

