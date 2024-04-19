// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Product', {
//       id: {
//         type:Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//       },
//       productName: {
//         type:Sequelize.STRING,
//         allowNull: false,
//       },
//       skuId: {
//         type:Sequelize.STRING,
//         allowNull: false,
//       },
//       skuName: {
//         type:Sequelize.STRING,
//         allowNull: false,
//       },
//       monthlyPrice: {
//         type:Sequelize.DOUBLE,
//         allowNull:false,
//       },
//       yearlyPrice: {
//         type: Sequelize.DOUBLE,
//         allowNull: false,
//       },
//       discount: {
//         type:Sequelize.INTEGER,
//         defaultValue: 0,
//         allowNull: false,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Product');
//   }
// };