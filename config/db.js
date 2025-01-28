const mysql = require('mysql2');
const { config } = require('./config');

const db = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    timezone: 'Z',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

module.exports = db;