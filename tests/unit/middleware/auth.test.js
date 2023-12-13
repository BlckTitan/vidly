const MONGOOSE = require('mongoose')
const USER_MODEL = require('../../../model/userModel')
const auth = require('../../../middleware/auth')

describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = {
            _id: MONGOOSE.Types.ObjectId().toHexString(), 
            isAdmin: true
        }

        const token = new USER_MODEL(user).generateAuthToken();

        const req = {
            header: jest.fn().mockReturnValue(token)
        }

        const res = {};
        const next = jest.fn()

        auth(req, res, next)

        expect(req.user).toMatch(user)
    })
})