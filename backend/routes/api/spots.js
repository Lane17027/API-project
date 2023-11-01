const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Spot,ReviewImage, SpotImage} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

//Get details of a Spot from an id
// router.get('/:spotId', async(req,res,next)=>{
//     // const {spotId}=req.params

//     // const spot=await Spot.findByPk(spotId,{
//     //     include: {

//     //     }
//     // })


// })



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

   //see if the spot has a review, if not set avg rating to no reviews. If it does, push to reviews array
   for (let spot of mySpots){
    const review= await Review.findAll({
        where: {
            spotId: spot.id
        }
    })
    if(review.length){
        reviews.push(review)
    }
    else {
       spot.dataValues.avgRating='There are no reviews for this spot, be the first one!'
    }
   }

   //Find the average review for each spot, push to averages array to later assign to each spot
   for (let review of reviews){
    let sum=0
    for (let i=0;i<review.length;i++){
       sum+=review[i].stars
    }
    let avg=sum/review.length
    averages.push(avg)
   }

   //If avg rating for spot was previously assigned due to not having one, skip. If it is not assigned, assign the spot average
  for (let i=0;i<mySpots.length;i++){
    if(!mySpots[i].dataValues.avgRating){
        mySpots[i].dataValues.avgRating=averages[i]
    }
  }

  //if spot has preview image, set previewImage to the preview image url. If not, assign previewImage to it doesn't have a value
   for (let spot of mySpots){
    const previewImage= await SpotImage.findOne({
        where: {
            spotId:spot.id,
            preview:true
        }
    })
    if(previewImage){
        spot.dataValues.previewImage=previewImage.url
    }
    else{
        console.log(previewImage)
        spot.dataValues.previewImage="This spot doesn't have a preview image"
    }
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







router.use((err,req,res,next)=>{
    const status=err.statusCode || 500
    const message=err.message || "The requested resource couldn't be found."
    res.status(status)

   res.json({
        message
    })
})







module.exports = router;
