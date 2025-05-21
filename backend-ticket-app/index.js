const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const conexion = require('./config/db');

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente ');
});


const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);

});
