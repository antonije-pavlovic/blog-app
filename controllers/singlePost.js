const DB = require('../database/connection');
module.exports = (req,res) =>{
    console.log(req.params.id);
    let db3 = new DB();
    db3.getPost(req.params.id,(result)=>{
        res.render('post',{result});
    })   
}