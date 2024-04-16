require("dotenv").config();

const db = require("./models/index");
const express = require("express");
const cors = require("cors");
const { updateSubscriptions } = require("./controllers/automatic/subscriptions");
const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV == "production" ? process.env.GOOGLE_CONNECTION_NAME : `http://localhost:3000`,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(require("./routes"));
app.set("trust proxy", true);

const main = async () => {
  // Listen to the App Engine-specified port, or 3001 otherwise
  const port = process.env.NODE_ENV == "production" ? parseInt(process.env.SERVER_PORT) : 3001;

  try {
    //check if we can connect to db with no errors
    await db.sequelize.sync();
    console.log("Connection has been established successfully.");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });

    updateSubscriptions();

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();