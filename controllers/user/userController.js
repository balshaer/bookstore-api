const asyncHandler = require("express-async-handler");
const { User } = require("../../models/User");
const path = require("path");
const { uploadToCloud, cloudinaryRemove } = require("../../utils/cloudinary");

const fs = require("fs");

const showUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ id: req.body.id });
  if (!user || user.length === 0) {
    return res.status(404).json({ message: "user is not found" });
  }
  const result = await user.save();
  res.status(200).json(result);
});

const editUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
      },
    },
    { new: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({ message: "user is not found" });
  }
  const result = await user.save();
  res.status(200).json(result);
});

const deleteUser = asyncHandler(async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);

  if (!deleteUser) {
    return res.status(404).json({ message: "user is not found" });
  }

  res.status(200).json(deleteUser);
});

const uploadUserProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "no file provided" });
  }

  const imagePath = path.join(__dirname, `../../images/${req.file.filename}`);

  const uploadimage = await uploadToCloud(imagePath);

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "user is not found" });
  }
  user.profilePhoto = {
    url: uploadimage.secure_url,
    publicId: uploadimage.public_id,
  };

  if (user.profilePhoto && user.profilePhoto.publicId !== null) {
    await cloudinaryRemove(user.profilePhoto.publicId);
  }

  await user.save();

  res.status(200).json({
    message: "your profile photo uploaded successfully",
    profilePhoto: {
      url: uploadimage.secure_url,
      publicId: uploadimage.public_id,
    },
  });

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
    } else {
      console.log("Image deleted successfully");
    }
  });
});

module.exports = { editUser, deleteUser, showUser, uploadUserProfilePicture };
