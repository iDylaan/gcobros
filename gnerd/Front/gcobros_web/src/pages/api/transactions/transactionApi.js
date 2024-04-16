const ip = process.env.NEXT_PUBLIC_HOST;

const readAllTransactionByDomain = async (domain) => {
  try {
    const allTransactions = await fetch(
      `${ip}/api/transactions/by-domain/${domain}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return allTransactions.json();
  } catch (error) {
    console.log(`Error al obtener las transacciones del id: ${customerId}`);
    return null;
  }
};

const readTransactionById = async (transactionId) => {
  try {
    const response = await fetch(`${ip}/api/transactions/id/${transactionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.log("Ocurrio un error al obtener la transacción: " + error);
    return null;
  }
};

const readLastPaymentTransaction = async (domain) => {
  try {
    const response = await fetch(
      `${ip}/api/transactions/last-payment/${domain}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.json();
  } catch (error) {
    console.log("Ocurrio un error al obtener la última fecha de pago: ", error);
    return null;
  }
};

//* Read last three transactions
const readLastThreePaymentsByDomain = async (domain) => {
  try {
    const transactions = await fetch(
      `${ip}/api/transactions/last-transactions/by-domain/${domain}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    return transactions.json();
  } catch (error) {
    console.log(
      "Ocurrio un error al obtener las últimas tres transacciones: ",
      error
    );
    return null;
  }
};

module.exports = {
  readAllTransactionByDomain,
  readTransactionById,
  readLastPaymentTransaction,
  readLastThreePaymentsByDomain,
};
