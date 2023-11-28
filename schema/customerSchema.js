const MONGOOSE = require('mongoose')
const Joi = require('joi')

const CUSTOMER_SCHEMA = new MONGOOSE.Schema({
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

const validateCustomer = (customer) =>{
    const SCHEMA = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    })

    return SCHEMA.validate(customer)
}
module.exports = validateCustomer

module.exports = CUSTOMER_SCHEMA;