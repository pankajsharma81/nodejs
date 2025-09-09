const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log("connection failed", error);
    });
}

module.exports = connectDB;
