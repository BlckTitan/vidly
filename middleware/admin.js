function admin (req, res, next){
    
    if(!req.user.isAdmin) return res.status(403).send('ACCESS DENIED')

    next()
}

module.exports = admin