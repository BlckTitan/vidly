const MONGOOSE = require('mongoose');
const GENRE_SCHEMA = require('./genreSchema');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const MOVIE_SCHEMA = new MONGOOSE.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: GENRE_SCHEMA,
        required: true
    },
    numberInStock: {
        type: Number, 
        defaut: 0,
        required: true,
        min: 5,
        max: 255
    },
    dailyRentalRate: {
        type: String, 
        default: 0,
        min: 5,
        max: 255
    },
})

const validateMovie = (movie) =>{
    const SCHEMA = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    })

    return SCHEMA.validate(movie)
}
module.exports = validateMovie
module.exports = MOVIE_SCHEMA;
