const express = require("express");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../../middlewares/verifyToken");
const {
  editUser,
  deleteUser,
  showUser,
} = require("../../controllers/user/userController");

const route = express.Router();

route.get("/profile/:id", verifyTokenAndAdmin, showUser);
route.put("/profile/edit/:id", verifyTokenAndAuthorization, editUser);
route.delete("/profile/:id", verifyTokenAndAdmin, deleteUser);

module.exports = route;
