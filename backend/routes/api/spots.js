const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Spot,ReviewImage, SpotImage} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

//Get details of a Spot from an id
router.get('/:spotId', async(req,res,next)=>{
    const {spotId}=req.params

    const spot=await Spot.findByPk(spotId,{
        include: {
            
        }
    })


})

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

//Get all Spots owned by the Current User
router.get('/current',requireAuth, async (req,res,next)=>{
    const {user}= req;
   const userId=user.id;

   const mySpots=await Spot.findAll({
    where: {ownerId:userId}
   })

   let reviews=[]
   let averages=[]
   for (let spot of mySpots){
    const review= await Review.findAll({
        where: {
            spotId: spot.id
        }
    })
    reviews.push(review)

   }

   for (let review of reviews){
    let sum=0
    for (let i=0;i<review.length;i++){
       sum+=review[i].stars
    }
    let avg=sum/review.length
    averages.push(avg)
   }

  for (let i=0;i<mySpots.length;i++){
    mySpots[i].dataValues.avgRating=averages[i]
  }

   for (let spot of mySpots){
    const previewImage= await SpotImage.findOne({
        where: {
            spotId:spot.id,
            preview:true
        }
    })
    spot.dataValues.previewImage=previewImage.url

   }

   res.json({Spots: mySpots})

})

//Part One: Get all Spots-Completed
//Part Two: Add Query Filter to Get All Spots
router.get('/', async (req, res, next)=>{
    const Spots =await Spot.findAll()

    res.json({
        Spots
    })


})









module.exports = router;
