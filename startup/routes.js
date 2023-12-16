const EXPRESS = require('express')
const GENRE = require('../routes/genre')
const MOVIE = require('../routes/movie')
const CUSTOMER = require('../routes/customer')
const RENTAL = require('../routes/rental')
const USER = require('../routes/user')
const AUTH = require('../routes/auth')
const ERROR = require('../middleware/error');
const RETURN = require('../routes/return')

module.exports = function(APP){
    //routing
    APP.use(EXPRESS.json())
    APP.use('/api/genre', GENRE)
    APP.use('/api/movie', MOVIE)
    APP.use('/api/customer', CUSTOMER)
    APP.use('/api/rental', RENTAL)
    APP.use('/api/user', USER)
    APP.use('/api/auth', AUTH)
    APP.use('/api/return', RETURN)
    APP.use(ERROR)
}