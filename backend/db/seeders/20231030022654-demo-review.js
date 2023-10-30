'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

 await queryInterface.bulkInsert('Reviews', [{
   spotId: '',
   userId: '',
   review: '',
   stars: ''
 },{
  spotId: '',
  userId: '',
  review: '',
  stars: ''
},{
  spotId: '',
  userId: '',
  review: '',
  stars: ''
},{
  spotId: '',
  userId: '',
  review: '',
  stars: ''
},{
  spotId: '',
  userId: '',
  review: '',
  stars: ''
}]);

  },

  async down (queryInterface, Sequelize) {

 await queryInterface.bulkDelete('Reviews');

  }
};
