/*const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const verificarToken = require('../middleware/auth');

router.post('/', verificarToken, ticketController.crearTicket);
router.get('/', verificarToken, ticketController.obtenerTickets);
router.put('/:id', verificarToken, ticketController.actualizarEstado);

module.exports = router;*/
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Rutas sin middleware para pruebas rápidas
router.post('/', ticketController.crearTicket);
router.get('/', ticketController.obtenerTickets);
router.put('/:id', ticketController.actualizarEstado);

module.exports = router;
