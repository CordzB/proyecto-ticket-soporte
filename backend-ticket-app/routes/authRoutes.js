const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/registro
router.post('/registro', authController.registrar);

// POST /api/login
router.post('/login', authController.login);

module.exports = router;
