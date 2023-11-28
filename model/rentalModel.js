const MONGOOSE = require('mongoose')
const RENTAL_SCHEMA = require('../schema/rentalSchema')


const RENTAL_MODEL = MONGOOSE.model('Rental', RENTAL_SCHEMA)//returns a class

module.exports = RENTAL_MODEL;