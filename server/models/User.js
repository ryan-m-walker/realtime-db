const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  username: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('users', userSchema);