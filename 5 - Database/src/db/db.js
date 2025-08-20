import mongoose from "mongoose";

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://CRUD:dNWtz2WS8EWO13ac@cluster0.djhbufm.mongodb.net/cohort"
    )
    .then(() => {
      console.log("Connected To DB");
    });
}

// module.exports = connectToDB;
export default connectToDB;
