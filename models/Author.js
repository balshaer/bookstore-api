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
  },
  {}
);

function authorValidation(obj) {}

const author = mongoose.model("Author", authorSchema);
module.exports = author;
