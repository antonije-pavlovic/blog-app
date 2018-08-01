const DB = require('../database/connection');
module.exports = (req,res) => {
    let db = new DB();
    db.showAll((result)=>{   
        res.render('index',{result})
    })   
}