var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  login: String,
  password: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;