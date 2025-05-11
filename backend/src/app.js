require('dotenv').config(); // Cargar variables del .env

const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Rutas
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const biometriaRoutes = require('./routes/biometria');
const chatRoutes = require('./routes/chat');
const perfilRoutes = require('./routes/perfil');
const usuarioRoutes = require('./routes/usuario');  // Nueva ruta para usuarios

// Inicialización
const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// Middlewares
app.use(express.json());

// Endpoints protegidos con autenticación (la protección está en cada archivo de rutas)
app.use('/biometria', biometriaRoutes);
app.use('/perfil', perfilRoutes);
app.use('/chat', chatRoutes);

// Endpoints públicos
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Rutas para usuarios
app.use('/usuarios', usuarioRoutes);  // Agregar la ruta de usuarios

// Ruta principal
app.get('/', (req, res) => res.send('API RAGDEFIT funcionando ✅'));

// Iniciar servidor
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');
  } catch (err) {
    console.error('❌ Error de conexión a la base de datos:', err.message);
  }
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

