const sql = {
    firstupload: 'INSERT INTO game (version, downloadable) VALUES (?, ?)',
    game: 'SELECT * FROM game',
    update: 'UPDATE game SET version = ? WHERE version = ?'
};

module.exports = {sql};