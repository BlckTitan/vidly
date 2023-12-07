const EXPRESS = require('express')
const APP = EXPRESS()
const WINSTON = require('winston')
// require('winston-mongodb')
require('dotenv').config()

require('./startup/logging')()
require('./startup/db')()
require('./startup/routes')(APP)
require('./startup/config')()
// const CONFIG = require('config')


const PORT = process.env.PORT || 3000;
const SERVER = APP.listen(PORT, () => WINSTON.info(`Listening on ${PORT}`))

module.exports = SERVER