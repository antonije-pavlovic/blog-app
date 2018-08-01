module.exports = (req,res) => {
    if(req.session.user_id)
        return res.render('create');
    res.redirect('/login');
}