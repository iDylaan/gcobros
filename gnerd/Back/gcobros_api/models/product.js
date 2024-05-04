'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    id: {
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    productName: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    skuId: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    skuName: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    monthlyPrice: {
      type:DataTypes.DOUBLE,
      defaultValue: null,
      allowNull:true,
    },
    yearlyPrice: {
      type: DataTypes.DOUBLE,
      defaultValue: null,
      allowNull: true,
    },
    fixedPlan: {
      type:DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};