const express = require("express");
const {
  createBook,
  getBooks,
} = require("../../controllers/books/booksController");
const router = express.Router();

router.post("/create", createBook);
router.get("/", getBooks);

module.exports = router;
