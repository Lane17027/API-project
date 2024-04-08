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
        description: 'Step through the antique Indian gate and feel the city’s turbulence transform into the calm beauty of your private park and fountain. Enter the lofted great room with its wall of windows, gleaming chef’s kitchen, and unique architectural elements and you know this home is a work of art. Discover the powder room behind the vault door. The huge main floor master suite has ensuite heated floors, double sinks, a shower, and a salmon holding tank soaking tub. Two bedrooms, a ¾ bath, and a laundry room complete the main floor. Downstairs, a redwood shingle wall is lit from behind shaped as a wave. The giant family room has a bank of windows and two bedrooms, a full bath, and a wine cellar. The decks open to a wooded oasis on Thornton Creek.',
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
        description: "The LAST HOME available in this community - your new oasis in Magnolia awaits! A step up from condo living - say goodbye to enormous HOA dues + rental restrictions, making this the perfect investment! This gorgeous cottage-style home blends comfort, convenience & modernity, creating the perfect urban retreat. Window-studded exteriors and skylights bring in abundant natural light, illuminating the welcoming color palette throughout. The kitchen features high-end black LG stainless steel appliances, quartz counters & custom cabinetry. With EV-capable parking, vaulted ceilings, 2 outdoor spaces & an ideal location - this home promises to elevate your lifestyle. Enjoy proximity to Discovery Park, Elliot Bay, Queen Anne, Old Ballard & much more!",
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
        description: "Presenting 'Monitor's Rest', winner of the distinguished Robb Report Best of the Best award for 'Best Amenities'. Nestled into the mountainside at the base of Monitor Bowl, this home has been designed to be the finest expression of mountain living in The West. Conceived by the award-winning team of Iluminus Group Development, CLB Architects, Design Workshop, Delos, Orsman Design, and Magleby Estate Homes, ''Monitor's Rest'' sets the new standard for a true legacy-quality modern compound on 5 ski-in/ski-out acres in the exclusive gated enclave of The Colony at White Pine Canyon. The timeless architecture offers world-class amenities paired with the finest materials and craftsmanship, including Italian steel windows and doors by Thermally Broken Steel, USA, Croatian limestone, shou sugi ban charred cypress, and a full copper roof combined with an innovative and cohesive layout for a seamless flow throughout almost 18,000 square feet of living space. ''Monitor's Rest'' is a wellness home, featuring Delos' DARWIN Home Wellness Intelligence Network. The DARWIN system regulates circadian rhythm lighting, monitors, and calibrates indoor air quality, filters pollutants and removes pathogens from the air including viruses, and improves water quality by removing impurities and contaminants. This exceptional residence was designed around a comprehensive suite of amenities featuring a 60' indoor/outdoor stainless steel pool, wellness spa with a world-class gym, Himalayan salt room, cold plunge pool, hot tub, hammam, ice fountain, infrared sauna, massage room, indoor sports court with volleyball/basketball/pickle ball/climbing wall, golf simulator, bowling alley, a versatile living/media room with Steinway-Lyngdorf audio and 200''-inch Barco 4k digital cinema laser projection system, a panoramic tower situated above the trees to take-in the breathtaking views and much more. 40 minutes to two FBO's, KSLC and KHCR.",
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
