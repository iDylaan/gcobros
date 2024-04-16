const ip  = process.env.NEXT_PUBLIC_HOST
async function getTestApi() {
  try {
    const response = await fetch(`${ip}/test`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getDSData() {
  try {
    const response = await fetch(`${ip}/test/ds`)
    return response.json()
  } catch(error) {
    console.log(error);
  }
}

async function getTransData() {
  try {
    const response = await fetch(`${ip}/test/td`)
    return response.json()
  } catch (error) {
    console.log(error);
  }
}

async function getPaymentData() {
  try {
    const response = await fetch(`${ip}/test/pd`)
    return response.json()
  } catch (error) {
    console.log(error);
  }
}
module.exports = {getTestApi, getDSData, getTransData, getPaymentData}
