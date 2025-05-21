const conexion = require('../config/db');

exports.crearTicket = (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({ mensaje: 'Campos incompletos' });
  }

  const sql = 'INSERT INTO tickets (titulo, descripcion) VALUES (?, ?)';
  conexion.query(sql, [titulo, descripcion], (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ mensaje: 'Ticket creado correctamente' });
  });
};

exports.obtenerTickets = (req, res) => {
  const sql = 'SELECT * FROM tickets';
  conexion.query(sql, (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
};

exports.actualizarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const sql = 'UPDATE tickets SET estado = ? WHERE id = ?';
  conexion.query(sql, [estado, id], (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Estado actualizado correctamente' });
  });
};
