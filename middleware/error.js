const WINSTON = require('winston')
const LOGGER = require('../utils/logger')


function error(err, req, res, next){

    // LOGGER.log({level: 'error', message: `${err.message} ${err}`})
    WINSTON.error(err.message, err)
    res.status(500).send(`Something happened, ${err.message}`)
}

module.exports = error