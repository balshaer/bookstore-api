const asyncHandler = require("express-async-handler");
const { Author } = require("../../models/Author");
const { User } = require("../../models/User");
const jwt = require("jsonwebtoken");

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

  if (checkAuthor || checkUser) {
    return res
      .status(400)
      .json({ message: "username ore email has already been taken" });
  }

  const newAuthor = new Author({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  const save = await newAuthor.save();

  const { password, ...othre } = save._doc;

  const token = await jwt.sign({ id: req.body.id }, process.env.SECRET_KEY);

  res.status(200).json({ ...othre, token });
});

module.exports = { getAllAuthors, createAuthor };
