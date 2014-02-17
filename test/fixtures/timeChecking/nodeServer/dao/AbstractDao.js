var nbInstances = 0;

var AbstractDao = function AbstractDao(subModel) {
  this.subModel = subModel;
  nbInstances = nbInstances + 1;
  console.log('instances dao', nbInstances);
};

AbstractDao.prototype.add = function(u, onDone, onError) {
  var newModel = new this.subModel(u);
  newModel.save(function (err) {
    if (err) {
      onError(err);
    } else {
      onDone(newModel);
    }
  });
};

AbstractDao.prototype.update = function(u, onDone, onError) {
  this.find({_id: u._id}, function(doc) {
    for(var key in u) {
      if(key !== '_id') {
        doc[key] = u[key];
      }
    }
    doc.save(function() {
      onDone(u);
    });
  }, onError);
};

AbstractDao.prototype.find = function(u, onDone, onError) {
  this.subModel.findOne(u).exec(function(err, task) {
    if(err) {
      onError(err);
    } else {
      onDone(task);
    }
  });
};

AbstractDao.prototype.findAll = function(u, onDone, onError) {
  this.subModel.find(u).exec(function(err, task) {
    if(err) {
      onError(err);
    } else {
      onDone(task);
    }
  });
};

AbstractDao.prototype.delete = function(u, onDone, onError) {
  this.subModel.remove(u, function (err) {
    if (err) {
      onError(err);
    } else {
      onDone({});
    }
  });
};

AbstractDao.prototype.deleteAll = function(onDone, onError) {
  this.subModel.remove({}, function (err) {
    if (err) {
      onError(err);
    } else {
      onDone({});
    }
  });
};

module.exports = AbstractDao;