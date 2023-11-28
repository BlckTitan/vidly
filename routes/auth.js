const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')
const Joi = require('joi');
const USER_MODEL = require('../model/userModel');
require('dotenv').config()

router.post('/', async (req, res) => {

    const RESULT = validate(req.body);
    if(RESULT.error) return res.status(400).send(RESULT.error.details[0].message)

    const USER = await USER_MODEL.findOne({email: req.body.email})
    if(!USER) return res.status(400).send('INVALID EMAIL OR PASSWORD')

    const VALID_PASSWORD = await bcrypt.compare(req.body.password, USER.password)
    if(!VALID_PASSWORD) return res.status(400).send('INVALID EMAIL OR PASSWORD')

    const TOKEN = USER.generateAuthToken()

    res.send(TOKEN)

})

const validate = (request) => {
    const SCHEMA = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    })

    return SCHEMA.validate(request)
}

module.exports = router;