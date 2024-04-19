const asyncHandler = require("express-async-handler");
const { User } = require("../../models/User");

const userProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

module.exports = { userProfileController };
