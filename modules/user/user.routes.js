const express = require('express');
const { userprofile, editprofile } = require('./user.controller');
const {authenticateToken} = require('../../middleware/auth.middleware');

const router = express.Router();

router.get('/userprofile', authenticateToken, userprofile);
router.put('/editprofile', authenticateToken, editprofile);


module.exports = router;