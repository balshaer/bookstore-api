const { default: mongoose } = require("mongoose");

module.exports = function dbconfig() {
  try {
    mongoose.connect(process.env.DB_CONNECT);
    console.log("Connected to Mongoose database successfully");
  } catch (error) {
    console.log("Error connecting to Mongoose database with error: " + error);
  }
};
