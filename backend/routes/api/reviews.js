const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current',restoreUser, async (req, res, next)=>{
    // if (!req.user){

    // }

    // if (req.user){
    //     const user=req.user

    //     const userReviews= await user.findAll()
    // }

});


//Add an Image to a Review based on the Review's id
router.get('/:reviewId/images', async (req, res, next)=>{


});

//Edit a review
router.put('/:reviewId', async (req,res,next)=>{


})


//Delete a Review
router.delete('/:reviewId', async (req,res,next)=>{

})





module.exports=router
