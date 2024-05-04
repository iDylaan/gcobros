const db = require("../../models/index");
const { Product } = require("../../models/index");
const { STATIC_PRODUCTS } = require("./staticProducts");
// Recibe un array que contiene los skuId del customer
const getAllProductsBySkuIds = async (req, res) => {
  try {
    const skuIds = req.body.skuIds;
    const products = await Product.findAll({
      where: {
        skuId: skuIds,
      },
    });

    if (products === null) {
      return res.status(200).json(null);
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log("Error al obtener los productos del cliente: " + error);
    return res.status(200).json(null);
  }
};

const getProductBySkuId = async (req, res) => {
  try {
    const skuId = req.params.skuId;
    const product = await Product.findOne({
      where: {
        skuId: skuId,
      },
    });

    if (product === null) {
      return res.status(200).json(null);
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error al obtener el producto: " + error);
    return res.status(200).json(null);
  }
};


async function validateExistProduct(skuId) {
  const product = await Product.findOne({
    where: {
      skuId: skuId,
    },
  });

  if (product === null) {
    return false;
  }

  return true;
}

const createProductsInDatabase = async (subscriptions) => {
  const transaction = await db.sequelize.transaction();

  let productsSkuIdAdded = [];

  try {
    for (const sub of subscriptions) {

      if (productsSkuIdAdded.includes(sub.skuId) || await validateExistProduct(sub.skuId)) {
        continue;
      }

      const product = STATIC_PRODUCTS.find(
        (product) => product.skuId == sub.skuId
      );
      const monthlyPrice = product ? product.monthlyPrice : 0.0;
      const yearlyPrice = product ? product.yearlyPrice : 0.0;

      await Product.create(
        {
          productName: sub.skuName,
          skuId: sub.skuId,
          skuName: sub.skuName,
          monthlyPrice: monthlyPrice,
          yearlyPrice: yearlyPrice,
        },
        { transaction: transaction }
      );

      // PREVENT DUPLICATES skuId
      productsSkuIdAdded.push(sub.skuId);
    }

    await transaction.commit();
  } catch (error) {
    console.error(
      "Ocurrio un error al agregar los productos a la base de datos: " + error
    );
    await transaction.rollback();
  }
};

const loadProduct = async (req, res) => {
  try {
    const skuName = req.params.skuName;
    const skuId = req.params.skuId;
    const productName = req.params.productName;


  } catch (error) {
    console.log("Error al cargar el producto: " + error);
    return res.status(200).json(null);
  }
}

module.exports = {
  getAllProductsBySkuIds,
  getProductBySkuId,
  createProductsInDatabase
};
