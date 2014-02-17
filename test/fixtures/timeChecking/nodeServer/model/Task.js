var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  duration: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;