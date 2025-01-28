const express = require('express');
const { loggedinuserachievements, userachievements, allachievements, oneachievement, addachievement } = require('./achievement.controller');
const { authenticateToken } = require('../../middleware/auth.middleware');

const router = express.Router();

router.get('/userachievements', authenticateToken, loggedinuserachievements);
router.get('/userachievements/:uid', authenticateToken, userachievements);
router.get('/all', allachievements);
router.get('/achievement/:aid', oneachievement);
router.post('/addachievement', authenticateToken, addachievement);

module.exports = router;