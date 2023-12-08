const mongoose = require('mongoose');
const WINSTON = require('winston')
require('dotenv').config()
require('winston-mongodb')

module.exports = function() {
    const DB = process.env.db;
    const DB_TEST = process.env.db_test;
    //connecting to database
    mongoose.connect(`${DB_TEST}`)
    .then(() => WINSTON.info(`Connected to ${DB_TEST}...`))
    // .catch(err => console.error('Could not connect to MongoDB...', err));
}