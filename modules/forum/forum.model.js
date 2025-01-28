const help  = require('../../utils/helpers');

const sql = {
    newpost: 'INSERT INTO forum (title, uid, post, time) VALUES (?, ?, ?, NOW())',
    allpost: 'SELECT forum.post_id, forum.title, forum.post, forum.time, users.username, users.uid, COUNT(forum_comments.comment_id) AS comments FROM forum JOIN users ON forum.uid = users.uid JOIN forum_comments ON forum_comments.post_id = forum.post_id GROUP BY forum_comments.post_id ORDER BY forum.time DESC',
    onepost: 'SELECT forum.post_id, forum.title, forum.post, forum.time, users.username, users.uid, COUNT(forum_comments.comment_id) AS comments FROM forum JOIN users ON forum.uid = users.uid JOIN forum_comments ON forum_comments.post_id = forum.post_id WHERE forum.post_id = ? GROUP BY forum_comments.post_id',
    comments: 'SELECT forum_comments.comment_id, forum_comments.post_id, forum_comments.post, forum_comments.time, users.username, users.uid FROM forum_comments JOIN users ON forum_comments.uid = users.uid WHERE forum_comments.post_id = ? ORDER BY forum_comments.time ASC',
    newcomment: 'INSERT INTO forum_comments (post_id, uid, post, time) VALUES (?, ?, ?, NOW());',
    deletepost: 'DELETE FROM forum WHERE post_id = ? AND uid = ?',
    deletecomment: 'DELETE FROM forum_comments WHERE comment_id = ? AND uid = ?',
    editpost: null,
    editcomment: 'UPDATE forum_comments SET post = ?, time = NOW() WHERE comment_id = ? AND uid = ?'
};

const getEditQuery = async () => {
    const intervalTime = 100;  // Az időköz, amíg ellenőrizzük a 'fields'-t
    const timeoutTime = 5000;   // Az idő, amíg várunk a timeout-ra

    const startTime = Date.now();  // A kezdési idő, hogy ellenőrizhessük a timeout-ot

    while (help.fields.length === 0) {
        // Ha már eltelt a timeout idő, dobj hibát
        if (Date.now() - startTime > timeoutTime) {
            throw new Error("Timeout: 'fields' tömb üres maradt.");
        }

        // Várakozás az 'intervalTime' ideig, mielőtt újra ellenőrizzük
        await new Promise(resolve => setTimeout(resolve, intervalTime));
    }

    // Ha van adat a 'fields' tömbben, állítsuk be az 'edit' lekérdezést
    sql.editpost = `UPDATE forum SET ${help.fields.join(', ')}, time = NOW() WHERE post_id = ? AND uid = ?`;
    return sql.edit;
};

module.exports = { sql, getEditQuery };



