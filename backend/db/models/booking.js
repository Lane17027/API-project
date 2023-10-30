'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type:DataTypes.DATEONLY,
      //added unique/validator
      unique:true,
      validate: {
        isBeforeEndDate(value) {
          if (value >= this.endDate) {
            throw new Error('Start date must be before the end date');
          }
        },
      },
    },
    endDate:{
      type:DataTypes.DATEONLY,
      //added unique/validator
      unique:true,
      validate: {
        isAfterStartDate(value) {
          if (value <= this.startDate) {
            throw new Error('End date must be after the start date');
          }
        },
      },
    },

  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
