// const Joi = require('joi')
const express = require('express');
const router = express.Router();
const RENTAL_MODEL = require('../model/rentalModel')
const AUTH = require('../middleware/auth')
// const ADMIN = require('../middleware/admin')
// const VALIDATE_OBJECT_ID = require('../middleware/validateObjectId')



//post return
router.post('/', AUTH, async (req, res) => {


    if(!req.body.customerId) return res.status(400).send('CustomerId not given');
    if(!req.body.movieId) return res.status(400).send('MovieId not given')

    
    const RENTAL = await RENTAL_MODEL.findOne({
        'customer._id' : req.body.customerId,
        'movie._id' : req.body.movieId,
    })

    if(!RENTAL) return res.status(404).send('no rental for this customer/movie')
    if(RENTAL.dateReturned) return res.status(400).send('This rental has already been processed')
    
    RENTAL.dateReturned = new Date()
    await RENTAL.save(
        
    )
    
    return res.status(200).send()

})


module.exports = router