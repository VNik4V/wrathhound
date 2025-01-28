const db = require('../../config/db');
const {sql} = require('./achievement.model');

const loggedinuserachievements = (req,res) => {
    const {id} = req.user;
    db.query(sql.userachievements,[id], (err, result) => {
        if(err){
            res.status(500).json({error: 'Hiba a mátrixban'});
        }
        if(result.length === 0){
            return res.status(200).json({message: 'Nincsenek elért teljesítmények'});
        }
        return res.status(200).json(result);
    });
};

const userachievements = (req,res) => {
    const {uid} = req.params;
    db.query(sql.userachievements,[uid], (err, result) => {
        if(err){
            res.status(500).json({error: 'Hiba a mátrixban'});
        }
        if(result.length === 0){
            return res.status(200).json({message: 'Nincsenek elért teljesítmények'});
        }
        return res.status(200).json(result);
    });
};

const allachievements = (req,res) => {
    db.query(sql.allachievements, (err,result) => {
        if(err){
            return res.status(500).json({error: "Hiba az adatbázishoz való kapcsolódásban vagy az sql lekérdezésben!"});
        }
        res.status(200).json(result);
    });
};

const oneachievement = (req,res) => {
    const {aid} = req.params;
    if(isNaN(aid)){
        return res.status(400).json({error: "Nem megfelelő formátum"});
    }
    db.query(sql.oneachievement, [aid], (err,result) => {
        if(err){
            return res.status(500).json({error: "Hiba az adatbázishoz való kapcsolódásban vagy az sql lekérdezésben!"});
        }
        if(res.length === 0){
            return res.status(404).json({error: "Nem létezik!!4"})
        }
        res.status(200).json(result);
    });    
};

const addachievement = (req,res) => {
    const uid = req.user.id;
    const aid = req.body.aid;
    if(!uid || !aid){
        return res.status(400).json({error: "A godot nem küldött el minden adatot"});
    }
    db.query(sql.addachievement, [uid, aid],(err,result) =>{
        if(err){
            res.status(500).json({error: 'Hiba a mátrixban'});
        }
        res.status(200).json({message: "Achievement megszerezve!"});
    });
}

module.exports = {loggedinuserachievements, userachievements, allachievements, oneachievement, addachievement};