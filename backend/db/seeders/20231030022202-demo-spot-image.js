'use strict';

const {SpotImage}= require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


   await SpotImage.bulkCreate([
    //my house
    {
     spotId: 1,
     url : 'https://photos.zillowstatic.com/fp/2f25b2bb11043d1f8871242d15872a8f-cc_ft_768.webp',
     preview: true
   },
   {
    spotId: 1,
    url : 'https://photos.zillowstatic.com/fp/3bb312b053b1267b6b66179835e7960b-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 1,
    url : 'https://photos.zillowstatic.com/fp/22023daa6e4645b775aa5841638c11ce-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 1,
    url : 'https://photos.zillowstatic.com/fp/37fe7c9c93a97c1de39a8ab20b0057ad-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 1,
    url : 'https://photos.zillowstatic.com/fp/7b710ecda8f518d32bdbd6f101f74473-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 1,
    url : 'https://photos.zillowstatic.com/fp/7b8dbebbd7bef7bf61e2bdf068114d90-cc_ft_384.webp',
    preview: false
  },
  //2
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/7003c8523232ae11581fb1895633fc2b-cc_ft_768.webp',
    preview: true
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/378daec8dbbfcf8133bd9e689d3e4b3a-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/ca21fb69c05a169bcfbdabeb048246cd-cc_ft_768.webp',
    preview: false
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/f81cd0b01ea69bfa152861167db9095c-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/7ea8278da730ed0055d222e5f5a4401b-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/e3f70e06ba511ba2d2b42181dfe4305e-cc_ft_768.webp',
    preview: false
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/038ba199ad01ffd04fedd1a158a811f8-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/e7312c753a27178259c6fb081ae649d9-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/adaef806897b1e93d76a9f5b969295c1-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 2,
    url : 'https://photos.zillowstatic.com/fp/9d5322f630a4adfc9f9de24afe49cc4a-cc_ft_384.webp',
    preview: false
  },
  //3
  //lani's house
  {
    spotId: 3,
    url : 'https://maps.googleapis.com/maps/api/streetview?location=177+E+300+N+%2C+Hurricane%2C+UT+84737&size=768x576&key=AIzaSyARFMLB1na-BBWf7_R3-5YOQQaHqEJf6RQ&source=outdoor&&signature=IhjLDaYOXzNKEML0GPL-sWOqbAw=',
    preview: true
  },
  {
    spotId: 3,
    url : 'https://photos.zillowstatic.com/fp/ae13c1ffc6c9d2ece7ff0e1d8d05b471-cc_ft_768.webp',
    preview: false
  },
  {
    spotId: 3,
    url : 'https://photos.zillowstatic.com/fp/8324f5573c1d3a3d41741ed7ef60bc74-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 3,
    url : 'https://photos.zillowstatic.com/fp/0f44892c83792a25c8c4baf232991972-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 3,
    url : 'https://photos.zillowstatic.com/fp/c44f50ffc84bec86ccd438f4c46ee713-cc_ft_768.webp',
    preview: false
  },
  {
    spotId: 3,
    url : 'https://photos.zillowstatic.com/fp/d2f4929c4a50a902467b5f58efa065b8-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 3,
    url : 'https://photos.zillowstatic.com/fp/d46f7ff75c20372151e2f5f425832add-cc_ft_384.webp',
    preview: false
  },
  {
    spotId: 3,
    url : 'https://photos.zillowstatic.com/fp/db3f6c440b17dd4fc5a79e3f607f7f55-cc_ft_768.webp',
    preview: false
  },
  //4
  {
    spotId: 4,
    url : 'https://photos.zillowstatic.com/fp/c1f36a7cff98dbfb39430cad1d87df6f-cc_ft_768.webp',
    preview: true
  },
  {
    spotId: 4,
    url : 'https://photos.zillowstatic.com/fp/c631cec3afe73cce396cffe428252d20-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 4,
    url : 'https://photos.zillowstatic.com/fp/4263616da063afbbd212e78ce0884a69-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 4,
    url : 'https://photos.zillowstatic.com/fp/e7f9e74a43667a66fe6af8be7475069f-cc_ft_768.webp',
    preview:  false
  },
  {
    spotId: 4,
    url : 'https://photos.zillowstatic.com/fp/339763709dabbf7d36fc2fdfb428f084-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 4,
    url : 'https://photos.zillowstatic.com/fp/ca643739b2f5c8578d056880884b8f0e-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 4,
    url : 'https://photos.zillowstatic.com/fp/1b0b675fb91a9d9e60c0e5fbb51fdaa0-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 5,
    url : 'https://photos.zillowstatic.com/fp/abf305e5be692400ab4784d83cd59fa7-cc_ft_768.webp',
    preview:  true
  },
  {
    spotId: 5,
    url : 'https://photos.zillowstatic.com/fp/361ee359d2d5c1773b647d09da58e4b5-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 5,
    url : 'https://photos.zillowstatic.com/fp/e9ac81fd5b891edda2cdd5b5b6ee70db-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 5,
    url : 'https://photos.zillowstatic.com/fp/c1c01475e834a5d6b9907962d6aa42c3-cc_ft_768.webp',
    preview:  false
  },
  {
    spotId: 5,
    url : 'https://photos.zillowstatic.com/fp/b5c289c0ee0ae47dba715d7d77d0be17-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 5,
    url : 'https://photos.zillowstatic.com/fp/b4e1a91ee356af51ec7ea65ac34a5dda-cc_ft_384.webp',
    preview:  false
  },
  {
    spotId: 5,
    url : 'https://photos.zillowstatic.com/fp/69cbf87bc171c3a98dcd24e4519caca6-cc_ft_768.webp',
    preview:  false
  },
  {
    spotId: 5,
    url : 'https://photos.zillowstatic.com/fp/d74ebb527da663bfed02a0beb96f22fd-cc_ft_384.webp',
    preview:  false
  },
], {validate:true});

  },

  async down (queryInterface, Sequelize) {
    options.tableName='SpotImages'
    const Op=Sequelize.Op

   return queryInterface.bulkDelete(options, {
    spotId: {[Op.in]: [1,2,3,4,5]}
   })

  }
};
