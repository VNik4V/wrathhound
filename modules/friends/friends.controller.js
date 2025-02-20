const db = require('../../config/db');
const {sql} = require('./friends.model');

const addFriend = async (req,res) => {
    const {id} = req.user;
    const {uid} = req.params;
    try {
        const [result] = await db.query(sql.accept,[uid, id]);
        if(result.affectedRows === 0){
            const [result1] =await db.query(sql.addfriend, [id, uid]);
            return res.status(201).json({message: 'Barátkérelem elküldve'});
        }
        const [result2] = await db.query(sql.addfriend, [id, uid]);
        return res.status(201).json({message: 'Barátkérelem elfogadva'});
    } catch (err) {
        return res.status(500).json({error: 'Hiba a kapcsolat felvételénél'});
    }
    /*
    db.query(sql.accept,[uid, id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a kapcsolat felvételénél'});
        }
        if(result.affectedRows === 0){
            db.query(sql.addfriend, [id, uid], (err1,result1) => {
                if(err1){
                    return res.status(500).json({error: 'Hiba a kapcsolat felvételénél'});
                }
                return res.status(201).json({message: 'Barátkérelem elküldve'});
            });
        }
        db.query(sql.addfriend, [id, uid], (err2,result2) => {
            if(err2){
                return res.status(500).json({error: 'Hiba a kapcsolat felvételénél'});
            }
            return res.status(201).json({message: 'Barátkérelem elfogadva'});
        });      
    });
    */
};

const pending = async (req,res) => {
    const {id} = req.user;
    try {
        const [result] = await db.query(sql.pending, [id]);
        if(result.length === 0){
            return res.status(200).json({message: 'Nincsenek kérelmeid'});
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({error: 'Hiba a mátrixban'});
    }
    /*
    db.query(sql.pending, [id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a mátrixban'});
        }
        if(result.length === 0){
            return res.status(200).json({message: 'Nincsenek kérelmeid'});
        }
        return res.status(200).json(result);
    });
    */
};

const allFriends = async (req,res) => {
    const {id} = req.user;
    try {
        const [result] = await db.query(sql.friends, [id]);
        if(result.length === 0){
            return res.status(200).json({message: 'A barátlista üres'});
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({error: 'Hiba a mátrixban'});
    }
    /*
    db.query(sql.friends, [id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a mátrixban'});
        }
        if(result.length === 0){
            return res.status(200).json({message: 'A barátlista üres'});
        }
        return res.status(200).json(result);
    });
    */
};

const someoneFriends = async (req,res) => {
    const {uid} = req.params;
    try {
        const [result] = await db.query(sql.friends, [uid]);
        if(result.length === 0){
            return res.status(200).json({message: 'A barátlista üres'});
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({error: 'Hiba a mátrixban'});
    }
    /*
    db.query(sql.friends, [id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a mátrixban'});
        }
        if(result.length === 0){
            return res.status(200).json({message: 'A barátlista üres'});
        }
        return res.status(200).json(result);
    });
    */
};

const removeFriend = async (req,res) => {
    const {id} = req.user;
    const {uid} = req.params;
    try {
        const [result] = await db.query(sql.removefriend, [id, uid, uid, id]);
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'A kapcsolat nem található'});
        }
        return res.status(200).json({message: 'Kapcsolat törölve'});
    } catch (err) {
        return res.status(500).json({error: 'Hiba a kapcsolat törlésénél'});
    }
    /*
    db.query(sql.removefriend, [id, uid, uid, id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a kapcsolat törlésénél'});
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'A kapcsolat nem található'});
        }
        return res.status(200).json({message: 'Kapcsolat törölve'});
    });
    */
};


module.exports = {addFriend, pending, allFriends, removeFriend, someoneFriends}