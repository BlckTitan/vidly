const request = require('supertest')
const USER_MODEL = require('../../model/userModel');
const GENRE_MODEL = require('../../model/genreModel')

let server;
let name;
let token;

describe('auth middleware', () => {
    it('no test', () => {

    })
    /*const execute =  () => {
        return request(server)
        .post('/api/genre')
        .set('x-auth-token', token)
        .send({name: 'genre1'})
    }

    beforeEach(() => { 
        server = require('../../index');
        token = new USER_MODEL().generateAuthToken()
    })
    afterEach( async () => { 
        
        await GENRE_MODEL.deleteMany()
        await server.close();
    })

    it('should return 401 if no token is provided', async () => {
        token = ''
        const res = await execute()
        expect(res.status).toBe(401)
    })

    it('should return 400 if token is invalid', async () => {
        token = 'a'
        const res = await execute()
        expect(res.status).toBe(400)
    })

    it('should return 200 if  token is valid', async () => {
        const res = await execute()
        expect(res.status).toBe(200)
    })
    */
})