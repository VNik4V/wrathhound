const sql = {
    userachievements: 'SELECT achievements.achievement, achievements.description, got_achievements.time, achievements.aid FROM got_achievements JOIN achievements USING(aid) JOIN users USING(uid) WHERE users.uid = ?',
    allachievements: 'SELECT a.aid, a.achievement, a.description, (COUNT(ga.uid) / total_users.total_count) * 100 AS completion FROM achievements a LEFT JOIN got_achievements ga ON a.aid = ga.aid CROSS JOIN (SELECT COUNT(*) AS total_count FROM users) total_users GROUP BY a.aid, a.achievement, a.description, total_users.total_count',
    oneachievement: 'SELECT a.aid, a.achievement, a.description, (COUNT(ga.uid) / total_users.total_count) * 100 AS completion FROM achievements a LEFT JOIN got_achievements ga ON a.aid = ga.aid CROSS JOIN (SELECT COUNT(*) AS total_count FROM users) total_users WHERE a.aid = ? GROUP BY a.aid, a.achievement, a.description, total_users.total_count',
    addachievement: 'INSERT INTO got_achievements (uid, aid, time) VALUE (?, ?, NOW())'
}

module.exports = {sql};