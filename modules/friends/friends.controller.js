const db = require('../../config/db');
const {sql} = require('./friends.model');

const addFriend = (req,res) => {
    const {id} = req.user;
    const {uid} = req.params;
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
};

const pending = (req,res) => {
    const {id} = req.user;
    db.query(sql.pending, [id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a mátrixban'});
        }
        if(result.length === 0){
            return res.status(200).json({message: 'Nincsenek kérelmeid'});
        }
        return res.status(200).json(result);
    });
};

const allFriends = (req,res) => {
    const {id} = req.user;
    db.query(sql.friends, [id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a mátrixban'});
        }
        if(result.length === 0){
            return res.status(200).json({message: 'A barátlista üres'});
        }
        return res.status(200).json(result);
    });
};

const removeFriend = (req,res) => {
    const {id} = req.user;
    const {uid} = req.params;
    db.query(sql.removefriend, [id, uid, uid, id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a kapcsolat törlésénél'});
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'A kapcsolat nem található'});
        }
        return res.status(200).json({message: 'Kapcsolat törölve'});
    });
};


module.exports = {addFriend, pending, allFriends, removeFriend}