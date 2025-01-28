const db = require('../../config/db');
const {sql} = require('./game.model');
const {versionValidation} = require('../../utils/validation');

const uploadGame = (req,res) => {
    const {version} = req.body;
    const game = req.file ? req.file.filename : null;
    if(game === null) {
        return res.status(400).json({error: 'Nincs kiválasztva a feltölteni kívánt játék'});
    }
    try {
        versionValidation(version)
        db.query(sql.game, (err, result) => {
            if(err){
                return res.status(500).json({error: "Hiba a lekérdezés során"});
            }
            if(result.length === 0){
                db.query(sql.firstupload, [version, game], (err1, result1) => {
                    if(err1){
                        return res.status(500).json({error: "Hiba a feltöltéskor"});
                    }
                    return res.status(201).json({message: "Játék sikeresen feltöltve"});
                });
            }
            db.query(sql.update, [version, version], (err2, result2) => { 
                if(err2){
                    return res.status(500).json({error: "Hiba a frissítéskor"});
                }
                return res.status(201).json({message: "Játék frissítve"});
            });
            
        });
    } 
    catch(error) {
        return res.status(400).json({error: error.message});        
    }
};

module.exports = { uploadGame };