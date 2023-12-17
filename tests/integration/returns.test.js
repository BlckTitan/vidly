const MONGOOSE = require('mongoose')
const RENTAL_MODEL = require('../../model/rentalModel');
const request = require('supertest')
const USER_MODEL = require('../../model/userModel')


 describe('/api/rental', () => {
    let server;
    let rental;
    let token;
    let movieId;
    let customerId;

    const execute = () => {

        return request(server)
        .post('/api/return')
        .set('x-auth-token', token)
        .send({customerId, movieId})

    }

    beforeEach(async () => { 

        customerId = new MONGOOSE.Types.ObjectId();
        movieId = new MONGOOSE.Types.ObjectId();
        token = new USER_MODEL().generateAuthToken();

        server = require('../../index');

        rental = new RENTAL_MODEL({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            }, 

            movie: {
                _id: movieId,
                title: 'movie title',
                dailyRentalRate: 2
            }
        })

        await rental.save()
    })

    afterEach( async () => {

        await RENTAL_MODEL.deleteMany()
        await server.close();
       
    })

    it('no test', () => {

    })

    it('should return 401 if client is not logged in', async () => {

        token = '';

        const RESULT = await execute()  
        expect(RESULT.status).toBe(401)
    })
    
    it('should return 404 if no rental is found for this customer', async () => {
        await RENTAL_MODEL.deleteMany();
        
        const RESULT = await execute()  
        expect(RESULT.status).toBe(404)
    })

    it('should return 400 if the rental is already processed', async () => {

        rental.dateReturned = new Date()
        await rental.save();

        const RESULT = await execute()  
        expect(RESULT.status).toBe(400)
    })
    
    it('should return 200 if we have a valid request', async () => {

        const RESULT = await execute()  
        expect(RESULT.status).toBe(200)
    })

    it('should return 200 if we have a valid request', async () => {

        const RESULT = await execute()  
        expect(RESULT.status).toBe(200)
    })
    

    it('should set the returnDate if input is valid', async () => {
        
        await execute()

        const rentalInDb = await RENTAL_MODEL.findById(rental._id)
        const diff = new Date() - rentalInDb.dateReturned;
        
        expect(diff).toBeLessThan(10 * 1000)
    })

    it('should return 400 if movieId is not provided', async () => {
        
        movieId = '';

        const RESULT = await execute()

        expect(RESULT.status).toBe(400)
    })
})