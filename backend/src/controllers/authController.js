const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Usuario} = require('../models');

const SECRET = process.env.JWT_SECRET; // cámbialo a env

exports.register = async (req, res) => {
  const {email, contraseña, nombre, fecha_nacimiento} = req.body;

  try {
    const hash = await bcrypt.hash(contraseña, 10);
    await Usuario.create({
      email,
      contraseña_hash: hash,
      nombre,
      fecha_nacimiento,
    });
    res.status(201).json({message: 'Usuario registrado exitosamente'});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

exports.login = async (req, res) => {
  const {email, contraseña} = req.body;

  try {
    const user = await Usuario.findOne({where: {email}});
    if (!user) return res.status(404).json({error: 'Usuario no encontrado'});

    const valid = await bcrypt.compare(contraseña, user.contraseña_hash);
    if (!valid) return res.status(401).json({error: 'Contraseña incorrecta'});

    const token = jwt.sign({id: user.id}, SECRET, {expiresIn: '1d'});

    res.json({token, usuario: {id: user.id, nombre: user.nombre}});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};
