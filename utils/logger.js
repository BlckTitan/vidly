const WINSTON = require('winston')

const LOGGER = WINSTON.createLogger({
    transports: [
      new WINSTON.transports.File({
        filename: 'logfile.log',
        level: 'error'
      }),
      new WINSTON.transports.Console()
    ]
})

module.exports = LOGGER