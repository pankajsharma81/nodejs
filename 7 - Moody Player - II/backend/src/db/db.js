const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected To DB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
}

module.exports = connectToDB;
