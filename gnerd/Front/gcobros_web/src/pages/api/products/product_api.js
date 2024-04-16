const ip = process.env.NEXT_PUBLIC_HOST;

const readAllProductsCustomerBySkuId = async (skuIds) => {
  try {
    const products = await fetch(`${ip}/api/products/customer`, {
      method: "POST",
      body: JSON.stringify(skuIds),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return products.json();
  } catch (error) {
    console.log("Error al obtener los productos: " + error);
    return null;
  }
};

const readProductBySkuId = async (skuId) => {
  try {
    const product = await fetch(`${ip}/api/products/product-id/${skuId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    return product.json();
  } catch (error) {
    console.log("Error al obtener el producto: " + error);
    return null;
  }
};

module.exports = {
  readAllProductsCustomerBySkuId,
  readProductBySkuId,
};
