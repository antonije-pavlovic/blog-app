module.exports = (req,res,next) =>{
    console.log(req.body.username);
    if(!req.body.username || !req.body.email || !req.body.password)
        return res.redirect("/auth/register");
    next();
}