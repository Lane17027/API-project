const express = require("express");
const { Op } = require("sequelize");

const { requireAuth } = require("../../utils/auth");
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
//Part Two: Add Query Filter to Get All Spots-Completed

router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      size = 20,
      minLat,
      maxLat,
      minLng,
      maxLng,
      minPrice,
      maxPrice,
    } = req.query;

    if (!minLat && !maxLat && !minLng && !maxLng && !minPrice && !maxPrice) {
      //changing inside of this
      const spots = await Spot.findAll({
        include: [
          {
            model: SpotImage,
          },
          {
            model: Review,
          },
        ]
      });

      let spotsList = [];
      spots.forEach((spot) => {
        spotsList.push(spot.toJSON());
      });

      spotsList.forEach((spot) => {
        let totalStars = 0;
        let numReviews = 0;

        if (!spot.SpotImages.length) {
          spot.previewImage = "This spot doesn't have a preview Image";
        }
        spot.SpotImages.forEach((img) => {
          if (img.preview) {
            spot.previewImage = img.url;
          }
        });
        spot.Reviews.forEach((rev) => {
          totalStars += rev.stars;
          numReviews++;
        });
        if (numReviews > 0) {
          spot.avgRating = totalStars / numReviews;
        } else {
          spot.avgRating =
            "There are no reviews for this spot yet. Be the first to review!";
        }

        delete spot.Reviews;
        delete spot.SpotImages;
      });

      const response = {
        Spots: spotsList
      };


      return res.status(200).json(response);
    }

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(size, 10);

    if (
      isNaN(pageNumber) ||
      isNaN(pageSize) ||
      pageNumber < 1 ||
      pageNumber > 10 || // Maximum page number: 10
      pageSize < 1 ||
      pageSize > 20 || // Maximum page size: 20
      minPrice < 1 ||
      maxPrice < 1 ||
      minLat < -180 ||
      maxLat > 180 ||
      minLng < -180 ||
      maxLng > 180
    ) {
      return res.status(400).json({
        message: "Bad Request", // (or "Validation error" if generated by Sequelize),
        errors: {
          page: "Page must be greater than or equal to 1",
          size: "Size must be greater than or equal to 1",
          maxLat: "Maximum latitude is invalid",
          minLat: "Minimum latitude is invalid",
          minLng: "Maximum longitude is invalid",
          maxLng: "Minimum longitude is invalid",
          minPrice: "Minimum price must be greater than or equal to 0",
          maxPrice: "Maximum price must be greater than or equal to 0",
        },
      });
    }

    const filtering = {};
    if (minLat && maxLat) {
      filtering.lat = {
        [Op.between]: [minLat, maxLat],
      };
    }

    if (minLng && maxLng) {
      filtering.lng = {
        [Op.between]: [minLng, maxLng],
      };
    }

    if (minPrice && maxPrice) {
      filtering.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }

    console.log(filtering.lat);

    const spots = await Spot.findAll({
      include: [
        {
          model: SpotImage,
        },
        {
          model: Review,
        },
      ],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      where: filtering,
    });

    let spotsList = [];
    spots.forEach((spot) => {
      spotsList.push(spot.toJSON());
    });

    spotsList.forEach((spot) => {
      let totalStars = 0;
      let numReviews = 0;

      if (!spot.SpotImages.length) {
        spot.previewImage = "This spot doesn't have a preview Image";
      }
      spot.SpotImages.forEach((img) => {
        if (img.preview) {
          spot.previewImage = img.url;
        }
      });
      spot.Reviews.forEach((rev) => {
        totalStars += rev.stars;
        numReviews++;
      });
      if (numReviews > 0) {
        spot.avgRating = totalStars / numReviews;
      } else {
        spot.avgRating =
          "There are no reviews for this spot yet. Be the first to review!";
      }

      delete spot.Reviews;
      delete spot.SpotImages;
    });

    const response = {
      Spots: spotsList,
      page: pageNumber,
      size: pageSize,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching spots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { city } = req.query;
    console.log(city)
    if (!city) {
      return res.status(400).json({
        message: "Bad Request",
        errors: {
          city: "City parameter is required",
        },
      });
    }

    const spots = await Spot.findAll({
      where: { city },
      include: [
        {
          model: SpotImage,
        },
        {
          model: Review,
        },
      ],
    });

    let spotsList = spots.map((spot) => spot.toJSON());

    // Code for processing spot data and calculating average rating goes here

    const response = {
      Spots: spotsList,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error searching spots:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
  res.status(200).json({ Spots: mySpots });
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
        attributes: ["id", "firstName", "lastName"],
        as: "Owner",
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

  res.status(200).json(spot);
});

//Create a Spot
//Completed
router.post("/",  async (req, res, next) => {
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
router.post("/:spotId/images",  async (req, res, next) => {
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

  await newImage.save();

  res
    .status(200)
    .json({ id: newImage.id, url: newImage.url, preview: newImage.preview });
});

//Edit a Spot
//completed
router.put("/:spotId", async (req, res, next) => {
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

  res.status(200).json(newSpotInfo);
});

//Delete a Spot
router.delete("/:spotId",  async (req, res, next) => {
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
router.post("/:spotId/bookings",  async (req, res) => {
  try {
    const ownerId = req.user.id;
    const userId = req.user.id;
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;

    const newStartDate = new Date(startDate).getTime();
    const newEndDate = new Date(endDate).getTime();

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (newStartDate >= newEndDate) {
      return res.status(400).json({
        message: "Bad Request",
        errors: {
          endDate: "endDate cannot be on or before startDate",
        },
      });
    }

    if (ownerId === spot.ownerId) {
      return res.status(403).json({
        message: "You are not authorized to book this spot because you own it",
      });
    }

    const currBookings = await Booking.findAll({
      where: {
        spotId: spotId,
      },
    });

    const errObj = {};

    currBookings.forEach((bookings) => {
      const bookingStartDate = new Date(
        bookings.dataValues.startDate
      ).getTime();
      const bookingEndDate = new Date(bookings.dataValues.endDate).getTime();

      if (newStartDate >= bookingStartDate && newStartDate <= bookingEndDate) {
        errObj.startDate = "Start date conflicts with an existing bookings";
      }

      if (newEndDate >= bookingStartDate && newEndDate <= bookingEndDate) {
        errObj.endDate = "End date conflicts with an existing bookings";
      }

      if (newStartDate < bookingStartDate && newEndDate > bookingEndDate) {
        errObj.startDate = "Start date conflicts with an existing bookings";
        errObj.endDate = "End date conflicts with an existing bookings";
      }

      if (newStartDate === bookingStartDate) {
        errObj.startDate = "Start date conflicts with an existing bookings";
      }

      if (newStartDate === bookingEndDate) {
        errObj.startDate = "Start date conflicts with an existing bookings";
      }

      if (newEndDate === bookingEndDate) {
        errObj.endDate = "End date conflicts with an existing bookings";
      }

      if (newEndDate === bookingStartDate) {
        errObj.endDate = "End date conflicts with an existing bookings";
      }

      if (errObj.startDate || errObj.endDate) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: errObj,
        });
      }
    });

    if (errObj.startDate || errObj.endDate) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: errObj,
      });
    } else {
      const stringSpotId = JSON.parse(spotId);
      const numberSpotId = parseInt(stringSpotId);
      const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate,
      });

      res.status(201).json({
        id: newBooking.id,
        spotId: numberSpotId,
        userId: newBooking.userId,
        startDate: newBooking.startDate,
        endDate: newBooking.endDate,
        createdAt: newBooking.createdAt,
        updatedAt: newBooking.updatedAt,
      });
    }

    return null;
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Can't find the spot specified" });
  }
});

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const { spotId } = req.params;

  const testSpot = await Review.findAll({
    where: {
      spotId: 1,
    },
  });

  const spotReview = await Review.findAll({
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

  console.log(testSpot);

  if (!spotReview.length) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  res.status(200).json({ spotReview });
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", async (req, res, next) => {
  const { spotId } = req.params;
  const { userId, review, stars } = req.body;
  const spot = await Spot.findByPk(spotId);

  const data = { userId, spotId, review, stars };

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (!review || stars > 5 || stars < 1) {
    return res.status(400).json({
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

// router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
//   const { user } = req;
//   const { spotId } = req.params;
//   const { review, stars } = req.body;
//   const spot = await Spot.findByPk(spotId);

//   const data = { userId: user.id, spotId, review, stars };

//   if (!spot) {
//     res.status(404).json({
//       message: "Spot couldn't be found",
//     });
//   }

//   if (!review || stars > 5 || stars < 1) {
//     return res.status(400).json({
//       message: "Bad Request", // (or "Validation error" if generated by Sequelize),
//       errors: {
//         review: "Review text is required",
//         stars: "Stars must be an integer from 1 to 5",
//       },
//     });
//   }

//   let allReviews = await Review.findAll({
//     where: {
//       spotId,
//     },
//   });

//   for (let review of allReviews) {
//     if (review.userId == user.id) {
//       return res.status(500).json({
//         message: "User already has a review for this spot",
//       });
//     }
//   }

//   const newSpotReview = await spot.createReview(data);

//   res.status(201).json(newSpotReview);
// });

//Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings",  async (req, res, next) => {
  const { user } = req;
  const { spotId } = req.params;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });

  if (!spot) {
    return res.status(404).json({
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
