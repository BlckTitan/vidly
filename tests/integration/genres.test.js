const request = require('supertest');
const GENRE_MODEL = require('../../model/genreModel');

let server;

describe('/api/genre', () => {
    beforeEach(() => { server = require('../../index')})
    afterEach( async () => {

        await GENRE_MODEL.deleteMany()
        server.close();
       
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
});