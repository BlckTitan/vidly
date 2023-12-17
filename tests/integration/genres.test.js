const request = require('supertest');
const GENRE_MODEL = require('../../model/genreModel');
const USER_MODEL = require('../../model/userModel')

let server;
let token;
let name;

describe('/api/genre', () => {
    it('no test', () => {
        
    })

    /*const execute = () => {
        return request(server)
        .post('/api/genre')
        .set('x-auth-token', token)
        .send({name})
    }

    beforeEach(() => { server = require('../../index')})
    afterEach( async () => {

        await GENRE_MODEL.deleteMany()
        await server.close();
       
    })

    describe('GET/', () => {
        it('should return all genres', async () => {

            await GENRE_MODEL.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ])

            const res = await request(server).get('/api/genre');

            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy()
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy()

        });
    });

    describe('GET/:id', () => {

        it('should return a genre if a valid id is passed', async () => {

            const genre = new GENRE_MODEL({name: 'genre1'})
            await genre.save()

            const res = await request(server).get(`/api/genre/${genre._id}`)

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name)
        })

        it('should return 404 if invalid ID is passed', async () => {
            
            const res = await request(server).get(`/api/genre/1`)

            expect(res.status).toBe(404);
        })

    })

    describe('POST/', () => {

        beforeEach(() => {
            name = 'genre1';
            token  = new USER_MODEL().generateAuthToken();
        })

        it('should return 401 if the client is not logged in', async () => {
            token = '';
            const res = await execute()

            expect(res.status).toBe(401)
        })

        it('should save the genre if it is valid', async () => {
            
            await execute()

            const GENRE = await GENRE_MODEL.find({name: 'genre1'})

            expect(GENRE).not.toBeNull()
        })

        it('should save the genre if it is valid', async () => {
            
            const res =  await execute()

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1')
        })

        it('should return 400 if genre is less than 5 characters', async () => {
            
            name = 'genr'

            const res = await execute()

            expect(res.status).toBe(401)
        })

        it('should return 400 if genre is more than 50 characters', async () => {

            name = new Array(52).join('a')
            
            const res = await execute()

            expect(res.status).toBe(401)
        })
    })*/
});