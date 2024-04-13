const { date } = require("joi");
const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 30,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 255,
    required: true,
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
  },

  registrationDate: {
    type: Date,
    default: date.now,
    required: true,
  },
});
const user = mongoose.model("User", UserSchema);

module.exports = user;
