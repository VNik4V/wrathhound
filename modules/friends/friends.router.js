const express = require('express');
const { addFriend, pending, allFriends, removeFriend} = require('./friends.controller');
const {authenticateToken} = require('../../middleware/auth.middleware');

const router = express.Router();

router.post('/addfriend/:uid', authenticateToken, addFriend);
router.get('/pending', authenticateToken, pending);
router.get('/all', authenticateToken, allFriends);
router.delete('/removefriend/:uid', authenticateToken, removeFriend);

module.exports = router;