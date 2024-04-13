const express = require("express");
const asyncHandler = require("express-async-handler");
const { User, registerValidation } = require("../../models/User");
const router = express.Router();

const register = router.post(
  "/register",
  asyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    let username = await User.findOne({ username: req.body.username });
    // const { error } = registerValidation(req.body);

    // if (error) {
    //   return res.status(400).json({ message: error.details[0].message });
    // }

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
      password: req.body.password,
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      phoneNumber: req.body.phoneNumber,
    });

    const result = await user.save();

    res.status(200).json(result);
  })
);

module.exports = register;
