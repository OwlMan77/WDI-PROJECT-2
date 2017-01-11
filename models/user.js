const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema {
  username: {type: String, unique: true, trim: true, required: true},
  email: {type: String, unique: true, trim: true, required: true},
  passwordHash: {type: String, required: true}
}

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema
  .path('passwordHash');
  .validate(validatePasswordHash);

userSchema
  .path('email')
  .validate(validateEmail)
