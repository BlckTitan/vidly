const WINSTON = require('winston')
require('winston-mongodb')

module.exports = function (){
    
    if(!process.env.JWT_PRIVATE_KEY ){
        throw new Error('FATAL ERROR: jwtPrivateKey not defined')
        // process.exit(1)
    }
}