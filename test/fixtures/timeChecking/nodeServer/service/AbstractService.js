var nbInstances = 0;

var AbstractService = function AbstractService(dao) {
  this.dao = dao;
  nbInstances = nbInstances + 1;
  console.log('instances service', nbInstances);
};

AbstractService.prototype.add = function(u, onDone, onError) {
  this.dao.add(u, onDone, onError);
};

AbstractService.prototype.update = function(u, onDone, onError) {
  this.dao.update(u, onDone, onError);
};

AbstractService.prototype.find = function(u, onDone, onError) {
  this.dao.find(u, onDone, onError);
};

AbstractService.prototype.findAll = function(u, onDone, onError) {
  this.dao.findAll(u, onDone, onError);
};

AbstractService.prototype.delete = function(u, onDone, onError) {
  this.dao.delete(u, onDone, onError);
};

AbstractService.prototype.deleteAll = function(onDone, onError) {
  this.dao.deleteAll(onDone, onError);
};

module.exports = AbstractService;