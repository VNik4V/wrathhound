const help  = require('../../utils/helpers');

const sql = {
    // felhasználó adatai
    user: 'SELECT u.uid, u.username, u.email, u.role, (COUNT(ga.aid) / total.total_achievements) * 100 AS completion FROM users u LEFT JOIN got_achievements ga ON u.uid = ga.uid CROSS JOIN (SELECT COUNT(*) AS total_achievements FROM achievements) total WHERE u.uid = ? GROUP BY u.uid, u.username, u.email, u.role, total.total_achievements',
    //felhasználónév vagy jelszó módosítása, dinamikusan változik a lekérdezés
    edit: null
}

// Adatmódosítás SQL lekérdezésének készítése

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
    sql.edit = `UPDATE users SET ${help.fields.join(', ')} WHERE uid = ?`;
    return sql.edit;
};


/*const getEditQuery = () => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (help.fields.length > 0) {
                clearInterval(interval);
                sql.edit = `UPDATE users SET ${help.fields.join(', ')} WHERE uid = ?`;
                resolve(sql.edit);
            }
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            reject(new Error("Timeout: 'fields' tömb üres maradt."));
        }, 5000);
    });
};
*/
module.exports = { sql, getEditQuery };