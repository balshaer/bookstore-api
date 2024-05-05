const express = require("express");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../../middlewares/verifyToken");
const {
  editUser,
  deleteUser,
  showUser,
  uploadUserProfilePicture,
} = require("../../controllers/user/userController");
const { uploadPhoto } = require("../../middlewares/uploadProfilePicture");

const route = express.Router();

route.get("/profile/:id", verifyTokenAndAdmin, showUser);
route.put("/profile/edit/:id", verifyTokenAndAuthorization, editUser);
route.delete("/profile/:id", verifyTokenAndAdmin, deleteUser);
route.post(
  "/profile/photo",
  verifyToken,
  uploadPhoto.single("image"),
  uploadUserProfilePicture
);

module.exports = route;
