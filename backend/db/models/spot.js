'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.hasMany(models.Booking, {
        foreignKey:'spotId',
        onDelete:'CASCADE',
        hooks:true
      }),

      Spot.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as:'Owner'
      }),

      Spot.hasMany(models.SpotImage, {
        foreignKey:'spotId',
        onDelete:'CASCADE',
        hooks: true
      }),

      Spot.hasMany(models.Review, {
        foreignKey:'spotId',
        onDelete: 'CASCADE',
        hooks:true
      })

    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type:DataTypes.STRING,
      // added null
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      // added null
      allowNull:false
    },
    state: {
      type:DataTypes.STRING,
      // added null
      allowNull:false
    },
    country: {
      type:DataTypes.STRING,
      // added null
      allowNull:false
    },
    lat: {
      type:DataTypes.DECIMAL,
      //added min/max
      validate : {
        min: -90,
        max:90
      }

    },
    lng: {
      type:DataTypes.DECIMAL,
      //added min/max
      validate : {
        min: -180,
        max: 180
      }
    },
    name: {
      type:DataTypes.STRING(49),
      // added null
      allowNull:false
    },
    description: {
      //type: Sequelize.TEXT,
      type:DataTypes.STRING,
      // added null
      allowNull:false
    },
    price: {
      type: DataTypes.DECIMAL,
      //added null
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
