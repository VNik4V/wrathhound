const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config').config;

function authenticateToken(req,res,next) {
    const token = req.cookies.auth_token || req.session.token;
    if(!token){
        return res.status(403);
    }
    jwt.verify(token, JWT_SECRET, (err,user) => {
        if(err){
            return res.status(403)
        }
        req.user = user;
     });
     next();
}

function verifyAdmin(req,res,next) {
    const token = req.cookies.auth_token || req.session.token;
    if(!token){
        return res.status(403).json({message: 'Token nem található'});
    }
    jwt.verify(token, JWT_SECRET, (err,user) => {
        if(err){
            return res.status(403)
        }
        if(user.role!== 'admin'){
            return res.status(403).json({message: 'Nincs jogosultságod adminisztrációs műveletekre'});
        }
        req.user = user;
     });
     next();
}

module.exports = { authenticateToken, verifyAdmin };