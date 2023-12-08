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
});