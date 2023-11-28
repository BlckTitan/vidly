const Joi = require('joi')
const express = require('express');
const router = express.Router();
const CUSTOMER_MODEL = require('../model/customerModel');
const AUTH = require('../middleware/auth')
const ADMIN = require('../middleware/admin')

//get all courses
router.get('/', async (req, res) => {
    const CUSTOMER = await CUSTOMER_MODEL.find()
    .sort('name')
    res.send(CUSTOMER)
})

//handling get requests
router.get('/:id', async (req, res) => {
    const CUSTOMER = await CUSTOMER_MODEL.findById(req.params.id)
    .select({name: 1})

    if(!CUSTOMER){
        res.status(404).send('The course with the given ID was not found...')
    }else{
        res.send(CUSTOMER)
    }
})

//post request
router.post('/', [AUTH, ADMIN], async (req, res) => {

    const RESULT = validateRequest(req.body)

    if(RESULT.error){
        return console.log(RESULT.error.details[0].message)
    }

    let newCustomer = new CUSTOMER_MODEL({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
    })

    
    newCustomer = await newCustomer.save();
    res.send(newCustomer);

})

//put request

router.put('/:id', [AUTH, ADMIN], async (req, res) => {
    
    let updatedCustomer = await CUSTOMER_MODEL.findById(req.params.id)

    if(updatedCustomer){ 
        updatedCustomer.set({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone,
        })
    } else{
        return res.status(404).send('THE REQUESTED CUSTOMER WAS NOT FOUND')
    }

    updatedCustomer = await updatedCustomer.save()
    res.send(updatedCustomer)

})

router.delete('/:id', [AUTH, ADMIN], async (req, res) => {
   
    let CUSTOMER = await CUSTOMER_MODEL.findByIdAndRemove({_id: req.params.id})
    if(!CUSTOMER){
        res.status(404).send('THE REQUESTED CUSTOMER WAS NOT FOUND')
    }
    res.send(CUSTOMER)
})

const validateRequest = (request) => {
    const SCHEMA = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    })

    return SCHEMA.validate(request)
}

module.exports = router