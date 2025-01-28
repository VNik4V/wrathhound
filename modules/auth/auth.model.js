const sql = {
    search: 'SELECT * FROM users WHERE email = ?',
    register: 'INSERT INTO users (uid, username, email, psw, role) VALUES (NULL, ?, ?, ?, "user")',
};

module.exports = {sql};