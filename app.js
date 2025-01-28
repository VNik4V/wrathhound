const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { config } = require('./config/config');


const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
const achievementRoutes = require('./modules/achievements/achievement.routes');
const forumRoutes = require('./modules/forum/forum.router');
const friendsRoutes = require('./modules/friends/friends.router');
const gameRoutes = require('./modules/game/game.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({resave: false, saveUninitialized: true, secret: config.SESSION_SECRET}));
app.use(cors({
    origin: ['192.168.10.17', '192.168.10.16', '192.168.10.18', 'http://127.0.0.1:5500'],
    credentials: true
}));

app.use('/game', express.static(path.join(__dirname, 'thegame')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/game', gameRoutes);

module.exports = app;