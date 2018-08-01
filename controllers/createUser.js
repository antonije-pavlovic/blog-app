const DB = require('../database/connection');
const crypto = require('crypto');

module.exports = (req,res) =>{    
    let password= crypto.createHash('md5').update(req.body.password).digest("hex");   
    let db = new DB();
    db.insertUser(req.body.username,password,req.body.email);
    res.redirect('/');
}