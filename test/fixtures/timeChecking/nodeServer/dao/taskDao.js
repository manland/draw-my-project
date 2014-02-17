var util = require('util');
var mongoose = require('mongoose');

var AbstractDao = require('./AbstractDao');

var Task = require('../model/Task');

var TaskDao = function TaskDao() {
  AbstractDao.call(this, Task);
};

util.inherits(TaskDao, AbstractDao);

TaskDao.prototype.findAll = function(u, onDone, onError) {
  //TODO abstract populate way
  var populate;
  var where;
  if(u.populate) {
    populate = u.populate;
    delete u.populate;
  }
  if(u.where) {
    where = u.where;
    delete u.where;
  }
  var f = Task.find(u);
  if(where) {
    console.log(where.lte);
    console.log(where.gte);
    f = f.where(where.name).lte(where.lte).gte(where.gte);
  }
  if(populate) {
    for(var index in populate) {
      f = f.populate(populate[index]);
    }
  }

  f.exec(function(err, task) {
    if(err) {
      console.error(err);
      onError(err);
    } else {
      onDone(task);
    }
  });
};

module.exports = new TaskDao();