const mysql = require('mysql2/promise');
const { config } = require('./config');

const db = mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    timezone: 'Z',
    queueLimit: 0,
    connectionLimit: 1000
});

module.exports = db;