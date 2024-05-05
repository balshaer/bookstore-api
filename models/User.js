const Joi = require("joi");
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
      unique: true,
    },

    role: {
      type: String,
      enum: [process.env.USER_ROLE, process.env.AUTHOR_ROLE],
      default: process.env.USER_ROLE,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    profilePhoto: {
      type: Object,
      default: {
        url: "https://img.icons8.com/fluency/48/user-male-circle--v1.png",
        publicId: null,
      },
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
  });

  userSchema.validate(obj);
}

function loginValidation(obj) {
  const userSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().trim().email().min(3).max(255).required(),
    phoneNumber: Joi.string().trim(),
    password: Joi.string().trim().min(8).max(255).required(),
  });

  userSchema.validate(obj);
}

module.exports = { User, registerValidation, loginValidation };
