const express = require("express");
const router = express.Router();

const {
  getAllProductsBySkuIds,
  getProductBySkuId,
} = require("../controllers/products/productController");

router.get("/product-id/:skuId", getProductBySkuId);
router.post("/customer", getAllProductsBySkuIds);

module.exports = router;