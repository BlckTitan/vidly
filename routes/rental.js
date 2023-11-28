const RENTAL_MODEL  = require('../model/rentalModel')
const MOVIE_MODEL = require('../model/movieModel')
const CUSTOMER_MODEL = require('../model/customerModel')
const express = require('express')
const router = express.Router()
const Fawn = require('fawn')
const MONGOOSE = require('mongoose')
const AUTH = require('../middleware/auth')
const ADMIN = require('../middleware/admin')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

Fawn.init(MONGOOSE)

router.get('/', async (req, res) => {

    const RENTAL = await RENTAL_MODEL.find().sort('-dateOut')
    res.send(RENTAL)
})

router.get('/:id', async (req, res) => {
    
    const RENTAL = await RENTAL_MODEL.findById(req.params.id);
    
    if (!RENTAL) return res.status(404).send('The rental with the given ID was not found.');
    
    res.send(RENTAL);
});

router.post('/', [AUTH, ADMIN], async (req, res) => {
    const RESULT = validateRental(req.body)
    if(RESULT.error) return res.status(400).send(RESULT.error.details[0].message)

    const CUSTOMER = await CUSTOMER_MODEL.findById(req.body.customerId)
    if(!CUSTOMER) return res.status(400).send('Invalid customer')

    const MOVIE = await MOVIE_MODEL.findById(req.body.movieId)
    if(!MOVIE) return res.status(400).send('Invalid movie')

    if(MOVIE.numberInStock === 0) return res.status(400).send('Movie not in stock')

    let rental = new RENTAL_MODEL({
        customer: {
            _id: CUSTOMER._id,
            name: CUSTOMER.name,
            phone: CUSTOMER.phone
        },
        movie: {
            _id: MOVIE._id,
            title: MOVIE.title,
            dailyRentalRate: MOVIE.dailyRentalRate
        }
    })
    
    new Fawn.Task()
    .save('rentals', rental)
    .update('movies', {_id: MOVIE._id}, {
        $inc: { numberInStock: -1 }
    })
    .run()

    res.send(rental)
})

const validateRental = (customer) =>{
    const SCHEMA = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId(). required(),
    })

    return SCHEMA.validate(customer)
}

  module.exports = router