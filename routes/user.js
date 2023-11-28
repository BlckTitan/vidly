
const express = require('express');
const router = express.Router()
const USER_MODEL = require('../model/userModel')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const AUTH = require('../middleware/auth')

// const Fawn = require('fawn')
const Joi = require('joi')
// Joi.object = require('joi-objectid')(Joi)

router.get('/', async (req, res) => {
    throw new Error('could not get the users')

    const USER = await USER_MODEL.find()
    res.send(USER)
})

router.get('/me', AUTH, async (req, res) => {
    const USER = await USER_MODEL.findById(req.user._id).select('-password')
    res.send(USER)
})

router.post('/', async (req, res) => {
    const RESULT = validateUser (req.body)
    if(RESULT.error) return res.status(400).send(RESULT.error.details[0].message)

    let user = await USER_MODEL.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already exists');

    

    let newUser = new USER_MODEL(
        // {
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // }
        _.pick(req.body, ['name', 'email', 'password'])
    )

    const SALT = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, SALT)

    newUser = await  newUser.save()

    const TOKEN = newUser.generateAuthToken()

    res.header('x-auth-token', TOKEN).send(
        _.pick(newUser, ['_id', 'name', 'email'])
    )

})

// Fawn.init(MONGOOSE)

const validateUser = (User) => {
    const SCHEMA = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    })

    return SCHEMA.validate(User)
}

module.exports = router