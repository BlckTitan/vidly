const JWT = require('jsonwebtoken')

function auth(req, res, next) {
    const TOKEN = req.header('x-auth-token');
    if(!TOKEN) return res.status(401).send('ACCESS DENIED. NO TOKEN PROVIDED')

    try{
        const DECODED = JWT.verify(TOKEN, process.env.JWT_PRIVATE_KEY)
        req.user = DECODED;
        next()
    }

    catch(ex){
        res.status(400).send('INVALID TOKEN')
    }
}

module.exports = auth