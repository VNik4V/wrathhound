const sql = {
    addfriend: 'INSERT INTO friends (uid_1, uid_2) VALUES (?, ?)',
    accept: 'SELECT * FROM friends WHERE uid_1 = ? AND uid_2 = ?',
    pending: 'SELECT users.uid AS sender_id, users.username AS sender_username FROM friends JOIN users ON friends.uid_1 = users.uid WHERE friends.uid_2 = ? AND NOT EXISTS (SELECT 1 FROM friends f2 WHERE f2.uid_1 = friends.uid_2 AND f2.uid_2 = friends.uid_1)',
    friends: 'SELECT u.uid, u.username FROM users u JOIN friends f1 ON f1.uid_2 = u.uid WHERE f1.uid_1 = ? AND EXISTS (SELECT 1 FROM friends f2 WHERE f2.uid_1 = f1.uid_2 AND f2.uid_2 = f1.uid_1)',
    removefriend: 'DELETE FROM friends WHERE (uid_1 =? AND uid_2 =?) OR (uid_1 =? AND uid_2 =?)'
};

module.exports = { sql };

