const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const db = require('../../config/db');
const {JWT_SECRET, SESSION_SECRET} = require('../../config/config').config;
const {sql} = require('./auth.model');
const { usernameValidation, emailValidation, pswValidation } = require('../../utils/validation');


const registration = async (req,res) => {
    const {username, email, psw} = req.body;
    try{
        usernameValidation(username);
        emailValidation(email);
        pswValidation(psw);
    
        const mail = validator.normalizeEmail(email, [{
            all_lowercase: true,        
        }]);
        const hashed = await bcrypt.hash(psw,10);
        
        db.query(sql.search, [mail], (err,result) => {
            if(err){
                res.status(500).json({error: 'Hiba a mátrixban'});
            }
            if(result.length > 0){
                return res.status(400).json({error: 'Van már ilyen felhasználó!'})
            }
            db.query(sql.register, [username, mail, hashed], (err1, result1) => {
                if(err1){
                    res.status(500).json({error: 'Hiba a mátrixban'});
                }
                return res.status(201).json({message: "siker", id: result1.insertId});
            });
        });
    }
    catch(error){
        return res.status(400).json({error: error.message});
    }    
};

const login = (req,res) => {
    const {email, psw, remember} = req.body;
    try {
        emailValidation(email);
        pswValidation(psw);
    
        const mail = validator.normalizeEmail(email, [{
            all_lowercase: true,        
        }]);
        db.query(sql.search, [mail], async (err,result) => {
            if(err){
                res.status(500).json({error: 'Hiba a mátrixban'});
            }
            if(result.length === 0){
                return res.status(400).json({error: 'Nincs ezzel az emaillel felhasználó regisztrálva!'})
            }
    
            const user = result[0];
    
            const validpsw = await bcrypt.compare(psw, user.psw);
    
            if(!validpsw){
                return res.status(400).json({error: 'Érvénytelen jelszó!'});
            }

            const token = jwt.sign({ id: user.uid, role: user.role}, JWT_SECRET, { expiresIn: '1h' });
            //frontenden majd be kell állítani hogy a remember alapértelmezetten false legyen
            if(remember) {
                console.log(token);
                console.log(res.cookie('auth_token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'none',
                    maxAge: 1000 * 60 * 60 * 24 * 31 * 12
                }))
                res.cookie('auth_token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 1000 * 60 * 60 * 24 * 31 * 12
                });
            }
            else{
                req.session.token = token;
            }            
            res.status(200).json({ message: 'Sikeres bejelentkezés!', token});
        });       
    } 
    catch (error) {
        return res.status(400).json({error: error.message});
    }

};

const logout = (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.status(200).json({message: "Sikeres kijelentkezés"});
};

const validate =  (req, res) => {
    const token = req.cookies.auth_token || req.session.token;
    console.log(req.cookies);
    console.log(req.session);
    console.log(req.cookies.auth_token)
    console.log(req.session.token)
    console.log(token);
    try {
        // Token érvényesítése
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        res.json({ loggedIn: true });
    } catch (error) {
        res.json({ loggedIn: false });
    }
}

module.exports = {registration, login, logout, validate};