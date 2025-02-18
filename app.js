const express = require('express');
const cookieParser = require('cookie-parser');
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
app.use(cors({
    origin: ['192.168.10.17', '192.168.10.16', '192.168.10.18', 'http://127.0.0.1:5500', 'https://vnik4v.github.io', 'https://fantastic-salamander-a725c3.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Engedélyezett HTTP metódusok
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/game', express.static(path.join(__dirname, 'thegame')));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/game', gameRoutes);

module.exports = app;