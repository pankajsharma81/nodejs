import mongoose from "mongoose";

function connectToDB() {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected To DB");
  });
}

// module.exports = connectToDB;
export default connectToDB;
