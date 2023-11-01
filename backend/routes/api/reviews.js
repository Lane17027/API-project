const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User,Review,Spot,ReviewImage, SpotImage} = require('../../db/models');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

   for (let review of myReviews){
    const previewImage= await SpotImage.findOne({
        where: {spotId: review.spotId}
    })
    review.Spot.dataValues.previewImage=previewImage.url
   }


   res.json({Reviews: myReviews})
});










//Add an Image to a Review based on the Review's id

//Completed
router.post('/:reviewId/images',requireAuth, async (req, res, next)=>{
const {user}=req
const {url}=req.body
const reviewId=req.params.reviewId

const review=await Review.findByPk(reviewId)

const allReviewImage=await ReviewImage.findAll({
    where: {
        reviewId
    }

})

if (!review){
    const err=new Error ("Review couldn't be found")
    err.statusCode=404
    next(err)
}


if(user.id !== review.userId){
    const err= new Error("Forbidden")
    err.statusCode=403
    next(err)

}

if(allReviewImage.length>=10){
    const err= new Error ("Maximum number of images for this resource was reached")
    err.statusCode
    next(err)
}


const newReviewImg=await review.createReviewImage({
    url
})


res.json({
    allReviewImage:allReviewImage.length
})

});



//Edit a review

//Could not figure out Error Response: Body Validation Error handling,
//also couldn't figure out how it was passing stars validator for allowing
//numbers outside of 1-5
router.put('/:reviewId',requireAuth, async (req,res,next)=>{
    const {user}=req
    const {reviewId}=req.params
    const {review, stars}=req.body

    let idReview=await Review.findByPk(reviewId)

    if(!idReview){
        const err= new Error("Review couldn't be found")
        err.statusCode=404
        next(err)
    }

    if(user.id !== review.userId){
        const err= new Error("Forbidden")
        err.statusCode=403
        next(err)

    }

    idReview.review=review
    idReview.stars=stars

    await idReview.save()



    res.json({
        idReview
    })
})


//Delete a Review
//Completed
router.delete('/:reviewId', async (req,res,next)=>{
    const {reviewId}=req.params

    let idReview=await Review.findByPk(reviewId)

    if(!idReview){
        const err= new Error("Review couldn't be found")
        err.statusCode=404
        next(err)
    }

    idReview.destroy()

    res.json({
        message: 'Successfully deleted'
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





module.exports=router
