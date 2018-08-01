const mysql = require('mysql');
const crypto = require('crypto');
const params = {
    host: 'localhost',
    user : 'root',
    password : 'antonije',
    database : 'blog'
}
class DB{
    constructor(){
        this.conn=mysql.createConnection(params);
    }

    insertPost(title,subtitle,content,user_id,image,date){
        let query = "INSERT INTO post VALUES(?,?,?,?,?,?,?)";
        this.conn.query(query,[ ,title,subtitle,content,user_id,image,date],(err)=>{
            if(err)
                throw err;
            console.log('inserted');
        })
    }

    showAll(callback){
        let query = 'SELECT *, post.id as idPost FROM post INNER JOIN user ON post.user_id=user.id';
        this.conn.query(query , (err,res)=>{
            if(err)
                throw err
            callback(res);
        })
    }

    getPost(id,callback){
        let query = "SELECT *,user.username AS name FROM post INNER JOIN user ON post.user_id=user.id WHERE post.id=?";
        this.conn.query(query,id,(err,result)=>{
            if(err)
                throw err;
            callback(result);
        })    
    }

    insertUser(username,password,email){
        let query = 'INSERT INTO user VALUES(?,?,?,?)';
        this.conn.query(query,[ ,username,password,email],(err)=>{
            if(err)
                throw err;
        console.log('inserted');
        })
    }

    login(username,password){
        let pass= crypto.createHash('md5').update(password).digest("hex");
        let query = 'select * from user where username=? and password=?';
                 
        return new Promise((resolve,reject) => {
            this.conn.query(query,[username,pass],(err,rows)=>{
                if(err)
                    return reject(err)
                if(rows.length === 0)
                    return reject ('there is no user in database');
                else
                    return resolve(rows);                
            })
        })

    }
}
module.exports = DB;