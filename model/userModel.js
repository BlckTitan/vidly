const MONGOOSE = require('mongoose');
const USER_SCHEMA = require('../schema/userSchema');
const JWT = require('jsonwebtoken')
require('dotenv').config()

USER_SCHEMA.methods.generateAuthToken = function () {
    const TOKEN = JWT.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT_PRIVATE_KEY)
    return TOKEN
}

const USER_MODEL = MONGOOSE.model('User', USER_SCHEMA)

module.exports = USER_MODEL;   