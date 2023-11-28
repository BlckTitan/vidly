const MONGOOSE = require('mongoose')

const GENRE_SCHEMA = new MONGOOSE.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const validateGenre = (genre) =>{
    const SCHEMA = Joi.object({
        name: Joi.string().min(5).max(50).required(),
    })

    return SCHEMA.validate(genre)
}

module.exports = validateGenre
module.exports = GENRE_SCHEMA;