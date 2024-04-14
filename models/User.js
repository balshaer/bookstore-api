const Joi = require("joi");
const { date } = require("joi");
const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
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
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    role: {
      type: String,
      default: process.env.USER_ROLE,
      enum: [
        process.env.USER_ROLE,
        process.env.ADMIN_ROLE,
        process.env.AUTHOR_ROLE,
      ],
    },
  },
  {}
);
const User = mongoose.model("User", UserSchema);

function registerValidation(obj) {
  const userSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().trim().email().min(3).max(255).required(),
    password: Joi.string().trim().min(8).max(255).required(),
    fullName: Joi.string().min(2).max(255).required(),
    dateOfBirth: Joi.date(),
    phoneNumber: Joi.string().trim(),
    role: Joi.string(),
  });

  userSchema.validate(obj);
}

module.exports = { User, registerValidation };
