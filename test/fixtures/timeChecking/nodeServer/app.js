var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TimeChecking');

module.exports = app;

var restController = require('./controller/restController');
//app.use(express.logger());
app.use(express.static(__dirname + '/public'))
.use(express.favicon(__dirname + '/public/favicon.ico'))
.use(express.bodyParser())
.use(restController());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  app.listen(3000);
  console.log('Listening on port 3000');
});