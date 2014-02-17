var util = require('util');
var mongoose = require('mongoose');

var AbstractDao = require('./AbstractDao');
var User = require('../model/User');

var UserDao = function UserDao() {
  AbstractDao.call(this, User);
};

util.inherits(UserDao, AbstractDao);

module.exports = new UserDao();