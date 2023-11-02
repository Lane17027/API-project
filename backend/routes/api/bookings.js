const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Booking, Spot, SpotImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Get all of the Current User's Bookings
//I think completed
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  const userId = user.id;

  const myBookingsForSpots = await Booking.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
    ],
  });

  if (!myBookingsForSpots.length) {
    res.status(404).json("Booking couldn't be found");
  }

  for (let booking of myBookingsForSpots) {
    let spotImage = await SpotImage.findOne({
      where: {
        spotId: booking.spotId,
      },
    });
    let spot = await Spot.findOne({
      where: {
        id: booking.spotId,
      },
    });
    if (!spotImage) {
      booking.dataValues.Spot.dataValues.previewImage =
        "There is no preview Image for this spot";
    } else {
      booking.dataValues.Spot.dataValues.previewImage =
        spotImage.dataValues.url;
    }
  }

  res.status(200).json({ Bookings: myBookingsForSpots });
});

//Edit a Booking
router.put("/:bookingId", async (req, res, next) => {});

//Delete a Booking
//Completed
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { bookingId } = req.params;

  const bookingToDelete = await Booking.findByPk(bookingId);

  if (!bookingToDelete) {
    res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  if (bookingToDelete.userId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const startDate = new Date(bookingToDelete.startDate).getTime();
  const endDate = new Date(bookingToDelete.endDate).getTime();
  const today = new Date().getTime();

  if (today > startDate) {
    res.status(403).json({
      message: "Bookings that have been started can't be deleted",
    });
  }

  await bookingToDelete.destroy({
    message: "Successfully deleted",
  });

  res.status(200).json();
});

module.exports = router;
