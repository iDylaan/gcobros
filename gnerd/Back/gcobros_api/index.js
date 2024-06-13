const path = require("path");
// Cargar el archivo .env del ambiente correspondiente
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env`)
});

const db = require("./models/index");
const express = require("express");
const cors = require("cors");
const { updateSubscriptions } = require("./controllers/automatic/subscriptions");
const { updateProducts } = require("./controllers/automatic/products");
const { updateCustomers } = require("./controllers/automatic/customers");
const { updateTransactions } = require("./controllers/automatic/transactions");
const app = express();
const { initCronJobs } = require('./controllers/schedulers/jobs.js');

const corsOptions = {
  origin: `http://localhost:3000`,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(require("./routes"));
app.set("trust proxy", true);

const main = async () => {
  // Listen to the App Engine-specified port, or 3001 otherwise
  const port = parseInt(process.env.SERVER_PORT) || 3001;

  try {
    //check if we can connect to db with no errors
    await db.sequelize.sync();
    console.log("Connection has been established successfully.");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
    
    await updateProducts();
    await updateSubscriptions();
    await updateCustomers();
    await updateTransactions();

    initCronJobs();

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();
