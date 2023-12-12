const Joi = require('joi')
const express = require('express');
const router = express.Router();
const GENRE_MODEL = require('../model/genreModel');
const AUTH = require('../middleware/auth')
const ADMIN = require('../middleware/admin')
const VALIDATE_OBJECT_ID = require('../middleware/validateObjectId')

//get all GENRE
router.get('/', async (req, res) => {

    const GENRE = await GENRE_MODEL.find()
    .populate('name', '')
    .select('name')
    .sort('name')
    res.send(GENRE)
    
})

//handling get requests
router.get('/:id', VALIDATE_OBJECT_ID, async (req, res) => {
    
    const GENRE = await GENRE_MODEL.findById(req.params.id)
    .select({name: 1})

    if(!GENRE) return res.status(404).send('The genre with the given ID was not found...')
    
    res.send(GENRE)

})

//post request
router.post('/',  AUTH, async (req, res) => {

    const RESULT = validateRequest(req.body)

    if(RESULT.error){
        return console.log(RESULT.error.details[0].message)
    }

    let newGenre = new GENRE_MODEL({
        name: req.body.name,
        author: req.body.author,
        purchase: req.body.purchase,
        isPublished: req.body.isPublished
    })

    newGenre = await newGenre.save();
    res.send(newGenre);

})

//put request

router.put('/:id', AUTH, async (req, res) => {
    
    let updatedGenre = await GENRE_MODEL.findById(req.params.id)

    if(updatedGenre){ 
        updatedGenre.set({
            name: req.body.name,
            author: req.body.author,
            purchase: req.body.purchase,
            isPublished: req.body.isPublished
        })
    } else{
        return res.status(404).send('THE REQUESTED GENRE WAS NOT FOUND')
    }

    updatedGenre = await updatedGenre.save()
    res.send(updatedGenre)

})

router.delete('/:id', [AUTH, ADMIN], async (req, res) => {
   
    let GENRE = await GENRE_MODEL.findByIdAndRemove({_id: req.params.id}) 
    if(!GENRE){
        res.status(404).send('THE REQUESTED GENRE WAS NOT FOUND')
    }
    res.send(GENRE)
})

const validateRequest = (request) => {
    const SCHEMA = Joi.object({
        name: Joi.string().min(5).max(50).required()
    })

    return SCHEMA.validate(request)
}

module.exports = router