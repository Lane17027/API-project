'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


      await queryInterface.bulkInsert('Bookings', [{
        spotId:'',
        userId:'',
        startDate: '',
        endDate: '',
      },{
        spotId:'',
        userId:'',
        startDate: '',
        endDate: '',
      },{
        spotId:'',
        userId:'',
        startDate: '',
        endDate: '',
      },{
        spotId:'',
        userId:'',
        startDate: '',
        endDate: '',
      },{
        spotId:'',
        userId:'',
        startDate: '',
        endDate: '',
      },]);

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Bookings');

  }
};
