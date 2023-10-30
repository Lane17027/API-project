'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [{
      reviewId: '',
      url: ''
    },{
      reviewId: '',
      url: ''
    },{
      reviewId: '',
      url: ''
    },{
      reviewId: '',
      url: ''
    },{
      reviewId: '',
      url: ''
    },])
  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('ReviewImages');

  }
};
