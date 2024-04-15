const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const connectToDatabase = require("./config/db.config");
const { notFound, errorHandler } = require("./middlewares/error");

const registerRoute = require("./routes/auth/auth");
const loginRouter = require("./routes/auth/auth");

connectToDatabase();

app.use(express.json());
app.use("/api/v1/auth", registerRoute);
app.use("/api/v1/auth", loginRouter);

app.use(notFound);
app.use(errorHandler);

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
