const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, User } = require("../../models/User");

const registerController = asyncHandler(async (req, res) => {
  const error = registerValidation(req.body);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  let user = await User.findOne({ email: req.body.email });

  let username = await User.findOne({ username: req.body.username });
  let phoneNumber = await User.findOne({ phoneNumber: req.body.phoneNumber });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (user) {
    return res.status(401).json({ message: "This user is already registerd" });
  }
  if (username) {
    return res
      .status(400)
      .json({ message: "This username is already beentaken" });
  }

  if (phoneNumber) {
    return res
      .status(400)
      .json({ message: "This phonenumber is already regsiter" });
  }

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    fullName: req.body.fullName,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
  });
  const result = await user.save();

  const { password, ...other } = result._doc;

  const token = jwt.sign(
    { id: user._id, role: user.role, isAdmin: user.isAdmin },
    process.env.SECRET_KEY
  );

  res.status(200).json({ ...other, token });
});

const loginController = asyncHandler(async (req, res) => {
  const { email, username, phoneNumber, password } = req.body;

  if (!email && !username && !phoneNumber) {
    return res
      .status(400)
      .json({ message: "Please provide email, username, or phone number" });
  }

  let user;

  if (email) {
    user = await User.findOne({ email });
  } else if (username) {
    user = await User.findOne({ username });
  } else if (phoneNumber) {
    user = await User.findOne({ phoneNumber });
  }

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role, isAdmin: user.isAdmin },
    process.env.SECRET_KEY
  );

  res.status(200).json({ token });
});

module.exports = { registerController, loginController };
