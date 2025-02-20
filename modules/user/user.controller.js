const db = require('../../config/db');
const bcrypt = require('bcrypt');
const {sql, getEditQuery} = require('./user.model');
const{ usernameValidation, pswValidation } = require('../../utils/validation');
const help = require('../../utils/helpers'); 

const userprofile = async (req,res) => {
    const {id} = req.user;
    try {
        const [result] = await db.query(sql.user, [id]);
        if(result.length === 0){
            return res.status(404).json({error: "Felhasználó nem található"});
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({error: "Hiba a lekérdezésben"});
    }
    /*
    db.query(sql.user, [id], async (err,result) => {
        if(err){
            return res.status(500).json({error: "Hiba a lekérdezésben"});
        }
        res.status(200).json(result);
    });
    */
};

const anyuserprofile = async (req,res) => {
    const {uid} = req.params;
    try {
        const [result] = await db.query(sql.user, [uid]);
        if(result.length === 0){
            return res.status(404).json({error: "Felhasználó nem található"});
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({error: "Hiba a lekérdezésben"});
    }
    /*
    db.query(sql.user, [id], async (err,result) => {
        if(err){
            return res.status(500).json({error: "Hiba a lekérdezésben"});
        }
        res.status(200).json(result);
    });
    */
};

const editprofile = async (req,res) => {
    const username = req.body.username || '';
    const psw = req.body.psw || '';
    const uid = req.user.id;
    const values = [];
    help.fields = [];
    try {

        if (username !== '') {
            usernameValidation(username);
            help.fields.push('username = ?');
            values.push(username);
        }
        if (psw !== '') {
            pswValidation(psw);
            const hashed = await bcrypt.hash(psw, 10);
            help.fields.push('psw = ?');
            values.push(hashed);
        }
        if (help.fields.length === 0) {
            return res.status(400).json({ error: "Nincs változtatni kívánt adat!" });
        }
        values.push(uid);

        
        try {
            await getEditQuery();
            try {
                const [result] = await db.query(sql.edit, values);
                return res.status(200).json({ message: "Sikeres adatmódosítás!" });
            } catch (err) {
                return res.status(500).json({ error: "Nézd át az sql-t!!4!!44", err });
            }
            /*
            db.query(sql.edit, values, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Nézd át az sql-t!!4!!44", err });
                }
                res.status(200).json({ message: "Sikeres adatmódosítás!" });
            });
            */
        } catch (error) {
            console.error(error.message);
            return res.status(408).json({ error: "Időtúllépés, kérlek próbálkozz újra később" });
        }


    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
    
};

module.exports = { userprofile, editprofile, anyuserprofile };