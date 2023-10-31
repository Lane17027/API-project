const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', async (req,res,next)=>{

})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req,res,next)=> {


});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', async (req,res,next)=>{


});


//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', async (req,res,next)=>{

});


//Add Query Filter to Get All Spots
router.get('/', async (req, res, next)=>{
    
})









module.exports = router;
