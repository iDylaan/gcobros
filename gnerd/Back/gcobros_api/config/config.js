const path = require("path");
// Cargar el archivo .env del ambiente correspondiente
require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
});
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: process.env.GOOGLE_DATABASE_USER,
    password: process.env.GOOGLE_DATABASE_PASSWORD,
    database: process.env.GOOGLE_DATABASE_NAME,
    host: process.env.GOOGLE_CLOUD_INSTANCE,
    dialectOptions: {
      socketPath: process.env.GOOGLE_CLOUD_INSTANCE,
    },
    dialect: 'postgres',
  }
}
