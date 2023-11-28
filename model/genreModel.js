const MONGOOSE = require('mongoose')
const GENRE_SCHEMA = require('../schema/genreSchema')


const GENRE_MODEL = MONGOOSE.model('Genre', GENRE_SCHEMA)//returns a class

module.exports = GENRE_MODEL;