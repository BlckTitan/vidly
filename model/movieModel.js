const MONGOOSE = require('mongoose')
const MOVIE_SCHEMA = require('../schema/movieSchema')


const MOVIE_MODEL = MONGOOSE.model('Movie', MOVIE_SCHEMA)//returns a class

module.exports = MOVIE_MODEL;