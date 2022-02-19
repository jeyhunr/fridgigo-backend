const mongoose = require("mongoose");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbURI = process.env.DB_URI;

module.exports = () => {
  mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbURI}`);
  mongoose.connection.on("open", () => {
    console.log("Connect was successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Connection was fail: ", err);
  });
  mongoose.Promise = global.Promise;
};
