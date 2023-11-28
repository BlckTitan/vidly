const MONGOOSE = require('mongoose')

const RENTAL_SCHEMA = new MONGOOSE.Schema({
    customer: {
        type: new MONGOOSE.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        })
    },

    movie: {
        type: new MONGOOSE.Schema({
            title: {
                type:String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },

    dateReturned: {
        type: Date
    },

    rentalFee: {
        type: Number,
        min: 0
    }
})

const validateRental = (customer) =>{
    const SCHEMA = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string(). required(),
    })

    return SCHEMA.validate(customer)
}
module.exports = validateRental

module.exports = RENTAL_SCHEMA;