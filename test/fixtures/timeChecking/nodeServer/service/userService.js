var util = require('util');

var userDao = require('../dao/userDao');

var AbstractService = require('./AbstractService');
var taskService = require('./taskService');

var UserService = function UserService(userDao) {
  AbstractService.apply(this, arguments);
};

util.inherits(UserService, AbstractService);

UserService.prototype.find = function(u, onDone, onError) {
  AbstractService.prototype.find.call(this, u, function(user) {
    if(user !== undefined && user !== null) {
      var nu = user.toJSON();
      nu.tasks = '/rest/v1/user/tasks?_id=' + user._id;
      onDone(nu);
    } else {
      onError('not exist');
    }
  }, onError);
};

UserService.prototype.login = function(u, onDone, onError) {
  //TODO : check params
  this.find(
    {login: u.login, password: u.password}, 
    function(user) {
      if(user) {
        onDone(user);
      } else {
        onError('not exist');
      }
    }, 
    onError
  );
};

UserService.prototype.getAll = function(onDone, onError) {
  //TODO : check params
  this.findAll(
    {}, 
    function(user) {
      if(user) {
        onDone(user);
      } else {
        onError('not exist');
      }
    }, 
    onError
  );
};

UserService.prototype.tasks = function(u, onDone, onError) {
  //TODO : check params
  this.find(u, function(user) {
    taskService.findAll(
      {user: u._id}, 
      function(tasks) {
        if(tasks) {
          var nu = {
            _id: user._id,
            login: user.login,
            password: user.password,
            tasks: tasks
          };
          onDone(nu);
        } else {
          onError('not exist');
        }
      }, 
      onError
    );
  }, onError);
};

module.exports = new UserService(userDao);