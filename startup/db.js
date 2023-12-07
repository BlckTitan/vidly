const mongoose = require('mongoose');
const WINSTON = require('winston')
require('dotenv').config()
require('winston-mongodb')

module.exports = function() {
    const DB = process.env.db;
    //connecting to database
    mongoose.connect(`${DB}`)
    .then(() => WINSTON.info(`Connected to ${DB}...`))
    // .catch(err => console.error('Could not connect to MongoDB...', err));
}