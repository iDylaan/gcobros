// "use strict";
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable("Subscriptions", {
//       id: {
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//       },
//       customerId: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       subscriptionId: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       skuId: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       creationTime: {
//         type: Sequelize.STRING,
//       },
//       kind: {
//         type: Sequelize.STRING,
//       },
//       seats_kind: {
//         type: Sequelize.STRING,
//       },
//       seats_numberOfSeats: {
//         type: Sequelize.INTEGER,
//       },
//       seats_maximumNumberOfSeats: {
//         type: Sequelize.INTEGER,
//       },
//       seats_licensedNumberOfSeats: {
//         type: Sequelize.INTEGER,
//       },
//       totalToPay: {
//         type: Sequelize.DOUBLE,
//         allowNull: false,
//       },
//       alreadyPay: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false,
//         allowNull: false,
//       },
//       renewalSettings_kind: {
//         type: Sequelize.STRING,
//       },
//       renewalSettings_renewalType: {
//         type: Sequelize.STRING,
//       },
//       purchaseOrderId: {
//         type: Sequelize.STRING,
//       },
//       status: {
//         type: Sequelize.STRING,
//       },
//       resourceUiUrl: {
//         type: Sequelize.STRING,
//       },
//       billingMethod: {
//         type: Sequelize.STRING,
//       },
//       customerDomain: {
//         type: Sequelize.STRING,
//       },
//       dealCode: {
//         type: Sequelize.STRING,
//       },
//       skuName: {
//         type: Sequelize.STRING,
//       },
//       plan_planName: {
//         type: Sequelize.STRING,
//       },
//       plan_isCommitmentPlan: {
//         type: Sequelize.BOOLEAN,
//       },
//       plan_commitmentInterval_startTime: {
//         type: Sequelize.STRING,
//       },
//       plan_commitmentInterval_endTime: {
//         type: Sequelize.STRING,
//       },
//       trialSettings_isInTrial: {
//         type: Sequelize.BOOLEAN,
//       },
//       trialSettings_trialEndTime: {
//         type: Sequelize.STRING,
//       },
//       transferInfo_transferabilityExpirationTime: {
//         type: Sequelize.STRING,
//       },
//       transferInfo_minimumTransferableSeats: {
//         type: Sequelize.INTEGER,
//       },
//       transferInfo_currentLegacySkuId: {
//         type: Sequelize.STRING,
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
//     await queryInterface.dropTable("Subscriptions");
//   },
// };
