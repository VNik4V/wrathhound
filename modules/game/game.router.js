const express = require('express');
const { uploadGame } = require('./game.controller');
const {authenticateToken, verifyAdmin} = require('../../middleware/auth.middleware');
const upload = require('../../middleware/multer.middleware');

const router = express.Router();

router.put('/upload', authenticateToken, verifyAdmin, upload.single('game'), uploadGame);


module.exports = router;