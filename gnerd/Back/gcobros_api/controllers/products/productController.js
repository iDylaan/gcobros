const { Product } = require("../../models/index");
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
};
