const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  User,
  Review,
  Spot,
  ReviewImage,
  SpotImage,
  Booking,
} = require("../../db/models");

const router = express.Router();

//Part One: Get all Spots-Completed
//Part Two: Add Query Filter to Get All Spots
router.get("/", async (req, res, next) => {
  const Spots = await Spot.findAll();

  res.json({
    Spots,
  });
});

router.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "The requested resource couldn't be found.";
  res.status(status);

  res.json({
    message,
  });
});

//Get all Spots owned by the Current User
//Completed
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  const userId = user.id;
  const mySpots = await Spot.findAll({
    where: { ownerId: userId },
  });
  let reviews = [];
  let averages = [];

  //see if the spot has a review, if not set avg rating to no reviews. If it does, push to reviews array
  for (let spot of mySpots) {
    const review = await Review.findAll({
      where: {
        spotId: spot.id,
      },
    });
    if (review.length) {
      reviews.push(review);
    } else {
      spot.dataValues.avgRating =
        "There are no reviews for this spot, be the first one!";
    }
  }

  //Find the average review for each spot, push to averages array to later assign to each spot
  for (let review of reviews) {
    let sum = 0;
    for (let i = 0; i < review.length; i++) {
      sum += review[i].stars;
    }
    let avg = sum / review.length;
    averages.push(avg);
  }

  //If avg rating for spot was previously assigned due to not having one, skip. If it is not assigned, assign the spot average
  for (let i = 0; i < mySpots.length; i++) {
    if (!mySpots[i].dataValues.avgRating) {
      mySpots[i].dataValues.avgRating = averages[i];
    }
  }

  //if spot has preview image, set previewImage to the preview image url. If not, assign previewImage to it doesn't have a value
  for (let spot of mySpots) {
    const previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
    });
    if (previewImage) {
      spot.dataValues.previewImage = previewImage.url;
    } else {
      spot.dataValues.previewImage = "This spot doesn't have a preview image";
    }
  }
  res.json({ Spots: mySpots });
});

//Get details of a Spot from an id
//Need to reorganize the order of numReviews and AvgRating
router.get("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const reviews = await Review.findAll({
    where: {
      spotId,
    },
  });

  let sum = 0;
  for (let review of reviews) {
    sum += review.stars;
  }

  const avgRating = sum / reviews.length;

  if (!reviews.length) {
    spot.dataValues.numReviews =
      "There are currently no reviews for this listing, but you could be the first!";
    spot.dataValues.avgRating =
      "There are currently no reviews for this listing, but you could be the first!";
  } else {
    spot.dataValues.numReviews = reviews.length;
    spot.dataValues.avgRating = avgRating;
  }

  res.json(spot);
});

//Create a Spot
//Completed
router.post("/", requireAuth, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const dataObj = {
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  };

  if (
    !address ||
    !city ||
    !state ||
    !country ||
    lat > 90 ||
    lat < -90 ||
    lng < -180 ||
    lng > 180 ||
    name.length > 49 ||
    !description ||
    !price
  ) {
    return res.status(400).json({
      message: "Bad Request", // (or "Validation error" if generated by Sequelize),
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required",
      },
    });
  }

  const newSpot = await Spot.create(dataObj);

  res.status(201).json(newSpot);
});

//Add an Image to a Spot based on the Spot's id
//I believe completed
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const userId = user.id;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const data = { url, preview };

  const newImage = await spot.createSpotImage(data);

  res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview });
});

//Edit a Spot
//completed
router.put("/:spotId", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { user } = req;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const dataObj = {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  };

  if (
    !address ||
    !city ||
    !state ||
    !country ||
    lat > 90 ||
    lat < -90 ||
    lng < -180 ||
    lng > 180 ||
    name.length > 49 ||
    !description ||
    !price
  ) {
    return res.status(400).json({
      message: "Bad Request", // (or "Validation error" if generated by Sequelize),
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude is not valid",
        lng: "Longitude is not valid",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day is required",
      },
    });
  }
  const newSpotInfo = await spot.update(dataObj);

  res.json(newSpotInfo);
});

//Delete a Spot
//Didn't test the actual delete, but all the error codes work
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await spot.destroy();

  res.status(200).json({
    message: "Successfully deleted",
  });
});

//Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", async (req, res, next) => {});

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const { spotId } = req.params;

  const Reviews = await Review.findAll({
    where: {
      spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  if (!Reviews.length) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  res.json({ Reviews });
});

//Create a Review for a Spot based on the Spot's id
//I believe completed
router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(spotId);

  const data = { ownerId: req.user.id, review, stars };

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (!review || stars > 5 || stars < 1) {
    res.status(400).json({
      message: "Bad Request", // (or "Validation error" if generated by Sequelize),
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  }

  const newSpotReview = await spot.createReview(data);

  res.status(201).json(newSpotReview);
});

//Get all Bookings for a Spot based on the Spot's id
//Completed
router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { spotId } = req.params;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  const bookingsForAll = await Booking.findAll({
    where: {
      spotId,
    },
    attributes: ["spotId", "startDate", "endDate"],
  });

  const bookingsForOwner = await Booking.findAll({
    where: {
      spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (user.id !== spot.ownerId) {
    return res.status(200).json({ Bookings: bookingsForAll });
  } else return res.status(200).json({ Bookings: bookingsForOwner });
});

module.exports = router;
