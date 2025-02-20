const express = require('express');
const { userprofile, editprofile, anyuserprofile } = require('./user.controller');
const {authenticateToken} = require('../../middleware/auth.middleware');

const router = express.Router();

router.get('/userprofile', authenticateToken, userprofile);
router.get('/userprofile/:uid', anyuserprofile);
router.put('/editprofile', authenticateToken, editprofile);


module.exports = router;