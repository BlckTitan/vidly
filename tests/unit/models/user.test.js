const USER_MODEL = require('../../../model/userModel')
const jwt = require('jsonwebtoken')
const MONGOOSE = require('mongoose')
require('dotenv').config()

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const PAYLOAD = {
            _id: new MONGOOSE.Types.ObjectId().toHexString(), 
            isAdmin: true
        } 
        const USER = new USER_MODEL(PAYLOAD)
        const TOKEN = USER.generateAuthToken()
        const DECODED = jwt.verify(TOKEN, process.env.JWT_PRIVATE_KEY)
        expect(DECODED).toMatchObject(PAYLOAD)
    })
})