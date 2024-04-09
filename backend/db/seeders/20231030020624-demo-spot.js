'use strict';

const {Spot}= require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await Spot.bulkCreate([
        {
        ownerId: 1,
        address: '2330 Saddle Court',
        city: 'Idaho Falls',
        state: 'Idaho',
        country: 'United States of America',
        lat: 43.480802640023335,
        lng: -112.07777036153364,
        name: 'My Childhood home',
        description: 'My childhood home that I grew up in Idaho. This 1860 square foot single family home has 4 bedrooms and 2.0 bathrooms. This home is located at 2330 Saddle Ct, Idaho Falls, ID 83402.',
        price: 50
      }, {
        ownerId: 1,
        address: '9515 Sand Point Way NE',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States of America',
        lat: 32.01,
        lng: -101.22,
        name: 'Cozy Seattle home',
        description: "Step through the antique Indian gate and feel the city's turbulence transform into the calm beauty of your private park and fountain.",
        price: 300
      },
      {
        ownerId: 2,
        address: '177 E 300 N',
        city: 'Hurricane',
        state: 'Utah',
        country: 'United States of America',
        lat: 37.18138393940344,
        lng: -113.28503626058162,
        name: 'Wifes Childhood Home',
        description: 'Where my wife grew up next to Zion National Park',
        price: 99
      },
      {
        ownerId: 2,
        address: '3803 Gilman Avenue W',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States of America',
        lat: 47.654374,
        lng: -122.385145,
        name: 'Nice house in downtown Seattle',
        description: "The LAST HOME available in this community - your new oasis in Magnolia awaits!",
        price: 56
      },
      {
        ownerId: 3,
        address: '253 White Pine Canyon Rd',
        city: 'Park City',
        state: 'Utah',
        country: 'United States of America',
        lat: 40.648226654088575,
        lng: -111.55126918929693,
        name: 'Beautiful home in Park City!',
        description: "Presenting 'Monitor's Rest', winner of the distinguished Robb Report Best of the Best award for 'Best Amenities'.",
        price: 250
      }], {validate:true});

  },

  async down (queryInterface, Sequelize) {
     options.tableName='Spots';
     const Op=Sequelize.Op;

     return queryInterface.bulkDelete(options, {
      ownerId: {[Op.in]: [1,2,3]}
     },{})
  }
};
