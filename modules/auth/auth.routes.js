const express = require('express');
const {registration, login, logout, validate} = require('./auth.controller');
const {authenticateToken} = require('../../middleware/auth.middleware');

const router = express.Router();

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.get('/validate', validate);


module.exports = router;