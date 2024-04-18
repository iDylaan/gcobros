// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Transactions', {
//       id: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//       },
//       chargeId: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       amount:{
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       domain: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       amount_captured: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       amount_refunded: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       balance_transaction: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       paid: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       payment_method: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       receipt_email: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       refunded: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//       created: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       merchant_amount: {
//         type: Sequelize.INTEGER,
//         allowNull: true,
//       },
//       merchant_currency: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       reference: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       description: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       firstDate: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       lastDate: {
//         type: Sequelize.STRING,
//         allowNull: true,
//       },
//       currency: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       status: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Transactions');
//   }
// };