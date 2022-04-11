const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
  });
  userSchema.plugin(uniqueValidator);
  const userDb = mongoose.model("user", userSchema);

module.exports = userDb;