const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', async (req,res,next)=>{


});

//Edit a Booking
router.put('/:bookingId', async (req,res,next)=>{

});


//Delete a Booking
router.delete('/bookingId', async (req,res,next)=>{


});









module.exports=router
