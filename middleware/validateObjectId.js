const MONGOOSE = require('mongoose')

module.exports = function(req, res, next){
    if(!MONGOOSE.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid ID')

    next();
}