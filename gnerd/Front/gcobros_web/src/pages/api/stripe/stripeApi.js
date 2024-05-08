const ip = process.env.NEXT_PUBLIC_HOST;

const createPaymentInStripe = async (data) => {
  try {
    const result = await fetch(`${ip}/api/stripe`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result === null) {
      return null
    }

    return result.json();
  } catch (error) {
    console.log(
      "Error, ocurrio un error el pago, intentalo nuevamente: " + error
    );
    return null;
  }
};

module.exports = {
  createPaymentInStripe,
};
 