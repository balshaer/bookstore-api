const asyncHandler = require("express-async-handler");
const { Author } = require("../../models/Author");
const { User } = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find();
  if (!authors || authors.length === 0) {
    return res.status(404).json({ message: "no authors found" });
  }
  res.status(200).json(authors);
});

const createAuthor = asyncHandler(async (req, res) => {
  const checkAuthor = await Author.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  const checkUser = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  const checkPhoneAuthor = await Author.findOne({
    phoneNumber: req.body.phoneNumber,
  });

  const checkPhoneUser = await User.findOne({
    phoneNumber: req.body.phoneNumber,
  });

  if (checkAuthor || checkUser) {
    return res
      .status(400)
      .json({ message: "username ore email has already been taken" });
  }

  if (checkPhoneUser || checkPhoneAuthor) {
    return res.status(400).json({ message: "this phone is already taken" });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const newAuthor = new Author({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: hash,
  });

  const save = await newAuthor.save();

  const { password, ...othre } = save._doc;

  const token = jwt.sign({ id: req.body.id }, process.env.SECRET_KEY);

  res.status(200).json({ ...othre, token });
});

const editAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
      },
    },
    { new: true }
  ).select("-password");

  if (!author) {
    return res.status(404).json({ message: "author not found" });
  }

  const result = await author.save();

  res.status(200).json(result);
});

module.exports = { getAllAuthors, createAuthor, editAuthor };
