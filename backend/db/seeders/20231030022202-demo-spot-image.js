'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


   await queryInterface.bulkInsert('SpotImages', [{
     spotId: '',
     url : '',
     preview: ''
   },{
    spotId: '',
    url : '',
    preview: ''
  },{
    spotId: '',
    url : '',
    preview: ''
  }]);

  },

  async down (queryInterface, Sequelize) {
    
   await queryInterface.bulkDelete('SpotImages');

  }
};
