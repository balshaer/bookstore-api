const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  title: {
    type: String,
    minLength: 2,
    maxLength: 255,
    required: true,
    unique: true,
  },

  author: {
    type: String,
    minLength: 2,
    maxLength: 255,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },
});

function bookvalidation(obj) {
  const bookSchema = Joi.object({
    title: Joi.string().required().min(2).max(255),
    author: Joi.string().required().min(2).max(255),
    price: Joi.string().required(),
  });

  bookSchema.validate(obj);
}

const Books = mongoose.model("Books", booksSchema);

module.exports = { Books, bookvalidation };
