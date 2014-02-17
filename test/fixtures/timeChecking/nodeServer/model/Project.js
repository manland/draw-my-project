var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: String
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;