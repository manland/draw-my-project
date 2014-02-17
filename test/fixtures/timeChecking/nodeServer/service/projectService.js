var util = require('util');

var projectDao = require('../dao/projectDao');

var AbstractService = require('./AbstractService');

var ProjectService = function ProjectService() {
  AbstractService.call(this, projectDao);
};

util.inherits(ProjectService, AbstractService);

ProjectService.prototype.getAll = function(onDone, onError) {
  //TODO : check params
  this.findAll(
    {}, 
    function(projects) {
      if(projects) {
        onDone(projects);
      } else {
        onError('not exist');
      }
    }, 
    onError
  );
};

module.exports = new ProjectService();