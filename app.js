const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const connectToDatabase = require("./config/connectToDB");
const { notFound, errorHandler } = require("./middlewares/error");

connectToDatabase();

app.use(express.json());

//routes
app.use("/api/v1/auth", require("./routes/auth/auth"));
app.use("/api/v1/auth", require("./routes/auth/auth"));
app.use("/api/v1/user", require("./routes/user/user"));
app.use("/api/v1/books", require("./routes/books/books"));

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => `Server running on port ${port}`);
