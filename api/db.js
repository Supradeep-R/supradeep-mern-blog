const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection successful");
  } catch (error) {
    console.log("error in connecting to database : "+ error);
  }
};

module.exports = mongoDB;