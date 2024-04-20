const express = require("express");
const {
  userProfileController,
} = require("../../controllers/user/userController");
const {
  verifyTokenAndAuthorization,
} = require("../../middlewares/verifyToken");

const route = express.Router();

route.get("/profile/:id", verifyTokenAndAuthorization, userProfileController);

module.exports = route;
