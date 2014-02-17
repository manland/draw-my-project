var util = require('util');
var mongoose = require('mongoose');

var AbstractDao = require('./AbstractDao');
var Project = require('../model/Project');

var ProjectDao = function ProjectDao() {
  AbstractDao.call(this, Project);
};

util.inherits(ProjectDao, AbstractDao);

module.exports = new ProjectDao();