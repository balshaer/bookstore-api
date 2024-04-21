const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  deleteBook,
  editBook,
} = require("../../controllers/books/booksController");
const {
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
} = require("../../middlewares/verifyToken");
const router = express.Router();

router.post("/create", verifyTokenAndAuthor, createBook);
router.get("/", verifyTokenAndAuthor, getBooks);
router.get("/:id", verifyTokenAndAuthor, getBookById);
router.delete("/:id", verifyTokenAndAuthor, deleteBook);
router.put("/:id", verifyTokenAndAuthor, editBook);

module.exports = router;
