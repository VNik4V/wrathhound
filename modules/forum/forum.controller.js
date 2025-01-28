const db = require('../../config/db');
const {sql, getEditQuery} = require('./forum.model');
const { postValidation } = require('../../utils/validation');
const help  = require('../../utils/helpers');

const createPost = (req,res) => {
    const {id} = req.user;
    const {title, post} = req.body;
    try {
        postValidation(title);
        postValidation(post);

        db.query(sql.newpost,[ title, id, post ], (err, result) => {
            if(err){
                return res.status(500).json({error: 'Hiba TT_TT'});
            }
            res.status(201).json({message: 'Fórumbejegyzés sikeres feltöltése', post_id: result.insertId});
        });

    } 
    catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const allPost = (req,res) => {
    db.query(sql.allpost, (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a lekérdezésben'});
        }
        res.status(200).json(result);
    });
};

const singlePost = (req,res) => {
    const {id} = req.params;
    db.query(sql.onepost, [id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a lekérdezésben'});
        }
        if(result.length === 0){
            return res.status(404).json({error: 'A keresett bejegyzés nem található'});
        }
        const post = result[0];
        db.query(sql.comments, [id], (error, comments) => {
            if(error){
                return res.status(500).json({error: 'Hiba a lekérdezésben'});
            }
            res.status(200).json({post, comments});
        });
    });
};

const newComment = (req,res) => {
    const {post} = req.body;
    const {post_id} = req.params;
    const {id} = req.user;
    try {
        postValidation(post);

        db.query(sql.newcomment,[ post_id, id, post ], (err, result) => {
            if(err){
                return res.status(500).json({error: 'Hiba a bejegyzés feltöltésénél'});
            }
            res.status(201).json({message: 'Komment sikeres feltöltése'});
        });
    } 
    catch(error) {
        return res.status(400).json({error: error.message});
    }

};

const deletePost = (req,res) => {
    const {post_id} = req.params;
    const {id} = req.user;
    db.query(sql.deletepost, [post_id, id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a bejegyzés törlésénél'});
        }
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'A keresett bejegyzés nem található'});
        }
        res.status(200).json({message: 'A bejegyzés sikeresen törölve'});
    });
};

const deleteComment = (req,res) => {
    const {comment_id} = req.params;
    const {id} = req.user;
    db.query(sql.deletecomment, [comment_id, id], (err, result) => {
        if(err){
            return res.status(500).json({error: 'Hiba a komment törlésénél'});
        }
        if(result.affectedRows === 0){
            return res.status(404).json({error: 'A keresett komment nem található'});
        }
        res.status(200).json({message: 'A komment sikeresen törölve'});
    });
};

const editPost = async (req,res) => {
    const {post_id} = req.params;
    const {title, post} = req.body;
    const {id} = req.user;
    help.fields = [];
    const values = [];
    try {
        if(title !== ''){
            titleValidation(title);
            help.fields.push('title =?');
            values.push(title);
        }
        if(post!== ''){
            postValidation(post);
            help.fields.push('post =?');
            values.push(post);
        }
        if(help.fields.length === 0){
            return res.status(400).json({error: 'Nem adott meg módosítási információkat'});
        }
        values.push(post_id);
        values.push(id);
        try {
            await getEditQuery();
            db.query(sql.editpost, values, (err,result) => {
                if(err){
                    return res.status(500).json({error: 'Hiba a bejegyzés módosításánál'});
                }
                if(result.affectedRows === 0){
                    return res.status(404).json({error: 'A keresett bejegyzés nem található'});
                }
                res.status(200).json({message: 'A bejegyzés sikeresen módosítva'});
            });
        } 
        catch(error) {
            console.error(error.message);
            return res.status(408).json({ error: "Időtúllépés, kérlek próbálkozz újra később" });
        }

    }
    catch(error) {
        return res.status(400).json({error: error.message});
    }
};

const editComment = (req,res) => {
    const {comment_id} = req.params;
    const {post} = req.body;
    const {id} = req.user;
    try {
        postValidation(post);
        db.query(sql.editcomment,[ post, comment_id, id ], (err, result) => {
            if(err){
                return res.status(500).json({error: 'Hiba a komment módosításánál'});
            }
            if(result.affectedRows === 0){
                return res.status(404).json({error: 'A keresett komment nem található'});
            }
            res.status(200).json({message: 'A komment sikeresen módosítva'});
        });
    }
    catch(error) {
        return res.status(400).json({error: error.message});
    }
};




module.exports = {createPost, allPost, singlePost, newComment, deletePost, deleteComment, editPost, editComment};