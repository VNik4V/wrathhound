const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = `thegame/`;
const filename = "WrathHound.exe";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {        
        cb(null, filename);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024 * 5 
    },
    fileFilter: (req, file, cb) => {
        const filetype = /exe/;
        const extname = filetype.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetype.test(file.mimetype);
        console.log(file.mimetype, mimetype, extname);
        if (extname) {
            cb(null, true);
        } 
        else {
            cb(new Error('A feltöltött fájl nem .exe'));
        }
    }

});

module.exports = upload;
