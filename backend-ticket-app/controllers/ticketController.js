const pool = require('../config/db');

// Crear nuevo ticket
exports.crearTicket = (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({ mensaje: 'Campos incompletos' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Error al obtener conexión:', err);
      return res.status(500).json({ error: err.message });
    }

    const sql = 'INSERT INTO tickets (titulo, descripcion) VALUES (?, ?)';
    connection.query(sql, [titulo, descripcion], (error, resultado) => {
      connection.release(); // liberar la conexión

      if (error) {
        console.error('❌ Error al guardar el ticket:', error);
        return res.status(500).json({ error: error.message });
      }

      res.status(201).json({ mensaje: '✅ Ticket guardado correctamente' });
    });
  });
};

// Obtener todos los tickets
exports.obtenerTickets = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Error al obtener conexión:', err);
      return res.status(500).json({ error: err.message });
    }

    const sql = 'SELECT * FROM tickets ORDER BY fecha DESC';
    connection.query(sql, (error, resultados) => {
      connection.release();

      if (error) {
        console.error('❌ Error al obtener tickets:', error);
        return res.status(500).json({ error: error.message });
      }

      res.json(resultados);
    });
  });
};

// Actualizar estado del ticket
exports.actualizarEstado = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ mensaje: 'El estado es obligatorio' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('❌ Error al obtener conexión:', err);
      return res.status(500).json({ error: err.message });
    }

    const sql = 'UPDATE tickets SET estado = ? WHERE id = ?';
    connection.query(sql, [estado, id], (error, resultado) => {
      connection.release();

      if (error) {
        console.error('❌ Error al actualizar estado:', error);
        return res.status(500).json({ error: error.message });
      }

      res.json({ mensaje: '✅ Estado actualizado correctamente' });
    });
  });
};
