const express = require("express");
const {
  userProfileController,
} = require("../../controllers/user/userController");
const { verifyTokenAndAuth } = require("../../middlewares/verifyToken");

const route = express.Router();

route.get("/profile/:id", verifyTokenAndAuth, userProfileController);

module.exports = route;
