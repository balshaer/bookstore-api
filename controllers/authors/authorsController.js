const asyncHandler = require("express-async-handler");
const { Author } = require("../../models/Author");

const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find();
  if (!authors || authors.length === 0) {
    return res.status(404).json({ message: "no authors found" });
  }
  res.status(200).json(authors);
});

const createAuthor = asyncHandler(async (req, res) => {
  let authorEmail = await Author.findOne({ email: req.body.email });
  let authorUsername = await Author.findOne({ email: req.body.username });

  if (authorUsername) {
    return res
      .status(400)
      .json({ message: "this username has already been taken" });
  }

  if (authorEmail) {
    return res
      .status(400)
      .json({ message: "this email has already been registerd" });
  }

  authorEmail = new Author({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  const save = await authorEmail.save();


  const { password, ...othre } = save._doc;

  res.status(200).json(save);
});

module.exports = { getAllAuthors, createAuthor };
