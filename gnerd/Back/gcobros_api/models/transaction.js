"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chargeId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount_captured: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount_refunded: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      balance_transaction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      planName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      receipt_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refunded: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      created: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      merchant_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      merchant_currency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payment_open_day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_limit_day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subscriptionId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skuName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reference: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
