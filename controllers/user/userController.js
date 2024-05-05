const asyncHandler = require("express-async-handler");
const { User } = require("../../models/User");

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

  return res.json({ message: "done" });
});

module.exports = { editUser, deleteUser, showUser, uploadUserProfilePicture };
