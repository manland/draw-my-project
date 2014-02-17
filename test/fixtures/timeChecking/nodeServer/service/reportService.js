var taskService = require('../service/taskService');

var ReportService = function ReportService() {
};

ReportService.prototype.getNbTaskByProject = function(onDone, onError) {
  var params = {populate: [{path: 'project', select: 'name'}]};
  taskService.findAll(params, function(data) {
    var temp = {};
    data.map(function(task) {
      if(temp[task.project.name] === undefined) {
        temp[task.project.name] = 0;
      }
      temp[task.project.name] = temp[task.project.name] + task.duration;
    });
    onDone(temp);
  }, onError);

};

module.exports = new ReportService();