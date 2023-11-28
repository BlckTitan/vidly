const Joi = require('joi')
const express = require('express');
const router = express.Router();
const MOVIE_MODEL = require('../model/movieModel');
const GENRE_MODEL = require('../model/genreModel');
const AUTH = require('../middleware/auth')
const ADMIN = require('../middleware/admin')



//get all MOVIEs
router.get('/', async (req, res) => {
    
    const MOVIE = await MOVIE_MODEL.find()
    // .select('name bio')
    .sort('name')
    res.send(MOVIE)

})

// handling get requests

router.get('/:id', async (req, res) => {
    const MOVIE = await MOVIE_MODEL.findById(req.params.id)
    .select({name: 1})

    if(!MOVIE){
        res.status(404).send('The movie with the given ID was not found...')
    }else{
        res.send(MOVIE)
    }
})

//post request
router.post('/',  [AUTH, ADMIN], async (req, res) => {

    const RESULT = validateRequest(req.body)

    if(RESULT.error) return console.log(RESULT.error.details[0].message)

    const GENRE = await GENRE_MODEL.findById(req.body.genreId)

    if(!GENRE) return res.status(404).send('INVALID GENRE')
    
    let newMovie = new MOVIE_MODEL({
        title: req.body.title,
        genre: {
            _id: GENRE._id,
            name: GENRE.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    newMovie = await newMovie.save()
    res.send(newMovie);

})

//put request

router.put('/:id', [AUTH, ADMIN], async (req, res) => {
    
    let updatedMovie = await MOVIE_MODEL.findById(req.params.id)

    if(updatedMovie){ 
        updatedMovie.set({
            name: req.body.name,
            bio: req.body.bio,
            website: req.body.website
        })
    } else{
        return res.status(404).send('THE REQUESTED MOVIE WAS NOT FOUND')
    }

    updatedMovie = await updatedMovie.save()
    res.send(updatedMovie)

})

router.delete('/:id', [AUTH, ADMIN], async (req, res) => {
   
    let MOVIE = await MOVIE_MODEL.findByIdAndRemove({_id: req.params.id})
    if(!MOVIE){
        res.status(404).send('THE REQUESTED MOVIE WAS NOT FOUND')
    }
    res.send(MOVIE)
})

const validateRequest = (request) => {
    const SCHEMA = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    })

    return SCHEMA.validate(request)
}

module.exports = router