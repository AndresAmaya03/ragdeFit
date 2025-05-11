-- Tabla usuario
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  contraseña_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  biometria_inicial JSONB
);

-- Tabla perfil_usuario (1 a 1 con usuario)
CREATE TABLE perfil_usuario (
  id SERIAL PRIMARY KEY,
  usuario_id INT UNIQUE REFERENCES usuario(id) ON DELETE CASCADE,
  objetivo VARCHAR(50) CHECK (objetivo IN ('perder_peso', 'ganar_musculo', 'mantenimiento')),
  preferencias_ejercicio JSONB,
  ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla rutina (1 a N con usuario)
CREATE TABLE rutina (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  descripcion TEXT,
  detalles JSONB NOT NULL
);

-- Tabla sesion_ejercicio (1 a N con usuario, 1 a N con rutina)
CREATE TABLE sesion_ejercicio (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
  rutina_id INT REFERENCES rutina(id) ON DELETE SET NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  duracion_min INT NOT NULL,
  calorias_quemadas INT,
  feedback TEXT
);

-- Tabla biometria_historica (1 a N con usuario)
CREATE TABLE biometria_historica (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  peso DECIMAL(5,2),
  estatura DECIMAL(5,2),
  grasa_corporal DECIMAL(5,2)
);

-- Tabla red_social (1 a N con usuario)
CREATE TABLE red_social (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
  plataforma VARCHAR(50) NOT NULL,
  token_acceso TEXT NOT NULL,
  ultima_sincronizacion TIMESTAMP
);

-- Tabla modelo_ia (registro independiente, sin relación directa con usuarios)
CREATE TABLE modelo_ia (
  id SERIAL PRIMARY KEY,
  version VARCHAR(50) NOT NULL,
  dataset VARCHAR(100),
  fecha_entrenamiento DATE,
  precision DECIMAL(5,2)
);

