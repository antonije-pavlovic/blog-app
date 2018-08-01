const DB = require('../database/connection');

module.exports = (req,res,)=>{    
    let db = new DB();
    let logPromise = db.login(req.body.username,req.body.password)
    logPromise
        .then((result)=>{
            //console.log( )
            req.session.user_id = result[0].id;         
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err)
            res.redirect('/login');
        })
}