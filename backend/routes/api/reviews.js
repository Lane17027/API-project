const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User,Review,Spot,ReviewImage, SpotImage} = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spotimage = require('../../db/models/spotimage');

const router = express.Router();



//Get all Reviews of the Current User
//Need to fix the updatedAt/createdAt to show correct numbers
router.get('/current', async (req, res, next)=>{
   const {user}= req;

   const userId=user.id

   const myReviews=await Review.findAll({
    where:{userId},
    include: [
        {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
        },
        {
        model: Spot,
        attributes: ['id', 'ownerId', 'address','city', 'state', 'country', 'lat', 'lng','name','price' ]
        },
        {
        model: ReviewImage,
        attributes: ['id', 'url']


        }

    ]
   })


   //
   for (let review of myReviews){
    const previewImage= await SpotImage.findOne({
        where: {spotId: review.spotId}
    })
    review.Spot.dataValues.previewImage=previewImage.url
   }





   res.json({Reviews: myReviews})
});










//Add an Image to a Review based on the Review's id

//Need to look at how to authorize the user, i.e the userId has to equal the review userId
router.post('/:reviewId/images', async (req, res, next)=>{
const {user}=req


const {url}=req.body

const reviewId=req.params.reviewId

const review=await Review.findByPk(reviewId)


const allReviewImage=await ReviewImage.findAll({
    where: {
        reviewId
    }
})

// if(user.id !== review.userId){
//     const error= new Error("Forbidden")
//     error.statusCode=403

// }

if(allReviewImage.length>=10){
    const error= new Error ("Maximum number of images for this resource was reached")
    error.statusCode
    next(error)
}


if (!review){
    const error=new Error ("Review couldn't be found")
    error.statusCode=404
    next(error)
}

const newReviewImg=await review.createReviewImage({
    url
})


res.json({
    allReviewImage:allReviewImage.length
})

});







//Edit a review
router.put('/:reviewId', async (req,res,next)=>{


})


//Delete a Review
router.delete('/:reviewId', async (req,res,next)=>{

})


router.use((error,req,res,next)=>{
    const status=error.statusCode || 500
    const message=error.message || 'Something went wrong'
    res.status(status)
    res.json({
        message
    })
})





module.exports=router
