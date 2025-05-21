const conexion = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = (req, res) => {
  const { nombre, correo, contrasena, rol } = req.body;

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Campos obligatorios incompletos' });
  }

  const hash = bcrypt.hashSync(contrasena, 10);

  const query = 'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)';
  conexion.query(query, [nombre, correo, hash, rol || 'tecnico'], (err, result) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al registrar', error: err });
    }
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  });
};

exports.login = (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
  }

  const query = 'SELECT * FROM usuarios WHERE correo = ?';
  conexion.query(query, [correo], (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    if (resultados.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const usuario = resultados[0];
    const passwordCorrecta = bcrypt.compareSync(contrasena, usuario.contrasena);

    if (!passwordCorrecta) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '4h'
    });

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  });
};
