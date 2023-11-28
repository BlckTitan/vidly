const WINSTON = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function (){
    WINSTON.add(new WINSTON.transports.File({filename: 'logfile.log'}))
    WINSTON.add(new WINSTON.transports.Console({colorize: true, prettyPrint: true}))
    WINSTON.add(new WINSTON.transports.MongoDB({useUnifiedTopology: true, db: 'mongodb://127.0.0.1/vidly'}))

    process.on('uncaughtException', (ex) => {
        console.log('We caught an exeption')
        WINSTON.error(ex.message, ex)
        process.exit(1)
    })

    process.on('unhandledRejection', (ex) => {
        console.log('We have an unhandled rejection')
        WINSTON.error(ex.message, ex)
        process.exit(1)
    })

}