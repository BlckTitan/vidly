const MONGOOSE = require('mongoose')
const CUSTOMER_SCHEMA = require('../schema/customerSchema')


const CUSTOMER_MODEL = MONGOOSE.model('Customer', CUSTOMER_SCHEMA)//returns a class

module.exports = CUSTOMER_MODEL;