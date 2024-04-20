const express = require("express");
const {
  getAllAuthors,
  createAuthor,
} = require("../../controllers/authors/authorsController");

const router = express.Router();

router.get("/", getAllAuthors);
router.post("/create", createAuthor);

module.exports = router;
