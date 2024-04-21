const express = require("express");
const {
  getAllAuthors,
  createAuthor,
  editAuthor,
} = require("../../controllers/authors/authorsController");
const {
  verifyTokenAndAuthor,
  verifyTokenAndAdmin,
} = require("../../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyTokenAndAdmin, getAllAuthors);
router.post("/create", verifyTokenAndAdmin, createAuthor);
router.put("/edit/:id", verifyTokenAndAuthor, editAuthor);

module.exports = router;
