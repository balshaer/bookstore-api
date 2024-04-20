const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  deleteBook,
  editBook,
} = require("../../controllers/books/booksController");
const { verifyTokenAndAuthor } = require("../../middlewares/verifyToken");
const router = express.Router();

router.post("/create", createBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.delete("/:id", deleteBook);
router.put("/:id", verifyTokenAndAuthor, editBook);

module.exports = router;
