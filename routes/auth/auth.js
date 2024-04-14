const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, registerValidation } = require("../../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const error = registerValidation(req.body);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const token = jwt.sign(
      { id: req.body.id, createdAt: req.body.createdAt },
      process.env.SECRET_KEY
    );

    let user = await User.findOne({ email: req.body.email });
    let username = await User.findOne({ username: req.body.username });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (user) {
      return res
        .status(401)
        .json({ message: "This user is already registerd" });
    }
    if (username) {
      return res
        .status(401)
        .json({ message: "This username is already beentaken" });
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

    const { password, ...other } = user._doc;

    res.status(200).json({ ...other, token });
  })
);

module.exports = register;
