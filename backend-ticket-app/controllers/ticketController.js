const conexion = require('../config/db');

// Crear nuevo ticket
exports.crearTicket = (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({ mensaje: 'Campos incompletos' });
  }

  const sql = 'INSERT INTO tickets (titulo, descripcion) VALUES (?, ?)';
  conexion.query(sql, [titulo, descripcion], (err, resultado) => {
    if (err) {
      console.error('❌ Error al guardar el ticket:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ mensaje: '✅ Ticket guardado correctamente' });
  });
};

// Obtener todos los tickets
exports.obtenerTickets = (req, res) => {
  const sql = 'SELECT * FROM tickets ORDER BY fecha DESC';
  conexion.query(sql, (err, resultados) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(resultados);
  });
};

// Actualizar estado de un ticket
exports.actualizarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const sql = 'UPDATE tickets SET estado = ? WHERE id = ?';
  conexion.query(sql, [estado, id], (err, resultado) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Estado actualizado correctamente' });
  });
};
