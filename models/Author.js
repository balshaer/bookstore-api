const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 30,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 255,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      minLength: 8,
      maxLength: 255,
      required: true,
    },

    fullName: {
      type: String,
      minLength: 2,
      maxLength: 255,
      required: true,
    },

    dateOfBirth: {
      type: Date,
    },

    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [process.env.USER_ROLE, process.env.AUTHOR_ROLE],
      default: process.env.AUTHOR_ROLE,
    },
  },
  {}
);

function authorValidation(obj) {
  const authorSchema = Joi.object({
    fullName: Joi.string().trim().min(3).max(255).required(),
    username: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().trim().email().min(3).max(255).required(),
    phoneNumber: Joi.string().trim(),
    password: Joi.string().trim().min(8).max(255).required(),
  });

  authorSchema.validate(obj);
}

const Author = mongoose.model("Author", authorSchema);
module.exports = { Author, authorValidation };
