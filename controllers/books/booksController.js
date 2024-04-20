const asyncHandler = require("express-async-handler");
const { Books, bookvalidation } = require("../../models/Books");

const createBook = asyncHandler(async (req, res) => {
  let book = await Books.findOne({ title: req.body.title });
  const error = bookvalidation(req.body);

  if (book) {
    return res
      .status(403)
      .json({ message: "this book is already in the list" });
  }

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  book = new Books({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
  });

  const save = await book.save();

  res.status(200).json(save);
});

const getBooks = asyncHandler(async (req, res) => {
  const getAllBooks = await Books.find();
  res.status(200).json(getAllBooks);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Books.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "book not found" });
  }
  res.status(200).json(book);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Books.findByIdAndDelete(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "book not found" });
  }

  res.status(200).json(book);
});

const editBook = asyncHandler(async (req, res) => {
  const book = await Books.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
      },
    },
    { new: true }
  );

  if (!book) {
    return res.status(404).json({ message: "book not found" });
  }

  res.status(200).json(book);
});

module.exports = { createBook, getBooks, getBookById, deleteBook, editBook };
