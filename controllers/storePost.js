const DB = require('../database/connection');
module.exports = (req,res) =>{    
        let db1 = new DB();
        let path = '/post/' + req.file.filename;
        db1.insertPost(req.body.title,req.body.subtitle,req.body.content,req.session.user_id,path,new Date());
        res.redirect('/');    

}