const mongoose = require('mongoose');
const EXPRESS = require('express')
const APP = EXPRESS();
const WINSTON = require('winston')
require('winston-mongodb')

module.exports = function() {
    //connecting to database
    mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => WINSTON.info('Connected to MongoDB...'))
    // .catch(err => console.error('Could not connect to MongoDB...', err));


    const PORT = process.env.PORT || 3000;
    APP.listen(PORT, () => WINSTON.info(`Listening on ${PORT}`))
}