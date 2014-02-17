var util = require('util');

var taskDao = require('../dao/taskDao');

var AbstractService = require('./AbstractService');

var TaskService = function TaskService() {
  AbstractService.call(this, taskDao);
};

util.inherits(TaskService, AbstractService);

TaskService.prototype.tasksForDates = function tasksForDates(params, onDone, onError) {
  var startTime = params.startDate;
  delete params.startDate;
  var startDate = new Date();
  startDate.setTime(startTime);
  var endTime = params.endDate;
  delete params.endDate;
  var endDate = new Date();
  endDate.setTime(endTime);

  console.log(startDate, endDate);

  params.date = {$gte: startDate, $lte: endDate};

  taskDao.findAll(params, onDone, onError);
};

module.exports = new TaskService();