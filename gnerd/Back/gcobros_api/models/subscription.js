"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Subscription.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      customerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subscriptionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skuId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creationTime: {
        type: DataTypes.STRING,
      },
      kind: {
        type: DataTypes.STRING,
      },
      seats_kind: {
        type: DataTypes.STRING,
      },
      seats_numberOfSeats: {
        type: DataTypes.INTEGER,
      },
      seats_maximumNumberOfSeats: {
        type: DataTypes.INTEGER,
      },
      seats_licensedNumberOfSeats: {
        type: DataTypes.INTEGER,
      },
      totalToPay: {
        type: DataTypes.DOUBLE,
        defaultValue: null,
        allowNull: true,
      },
      alreadyPay: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      renewalSettings_kind: {
        type: DataTypes.STRING,
      },
      renewalSettings_renewalType: {
        type: DataTypes.STRING,
      },
      purchaseOrderId: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      resourceUiUrl: {
        type: DataTypes.STRING,
      },
      billingMethod: {
        type: DataTypes.STRING,
      },
      customerDomain: {
        type: DataTypes.STRING,
      },
      dealCode: {
        type: DataTypes.STRING,
      },
      skuName: {
        type: DataTypes.STRING,
      },
      plan_planName: {
        type: DataTypes.STRING,
      },
      plan_isCommitmentPlan: {
        type: DataTypes.BOOLEAN,
      },
      plan_commitmentInterval_startTime: {
        type: DataTypes.STRING,
      },
      plan_commitmentInterval_endTime: {
        type: DataTypes.STRING,
      },
      trialSettings_isInTrial: {
        type: DataTypes.BOOLEAN,
      },
      trialSettings_trialEndTime: {
        type: DataTypes.STRING,
      },
      transferInfo_transferabilityExpirationTime: {
        type: DataTypes.STRING,
      },
      transferInfo_minimumTransferableSeats: {
        type: DataTypes.INTEGER,
      },
      transferInfo_currentLegacySkuId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Subscription",
    }
  );
  return Subscription;
};
