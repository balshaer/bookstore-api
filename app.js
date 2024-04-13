const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const connectToDatabase = require("./config/db.config");

connectToDatabase();

app
  .listen(port, () =>
    console.log("> Server is up and running on port : " + port)
  )
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Server is already running on port : "${port}`);
    } else {
      console.log("failed to connect to server with error  : " + err);
    }
  });
