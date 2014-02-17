var url = require('url');
var mongoose = require('mongoose');

var MongoUtil = require('../util/MongoUtil');

var userService = require('../service/userService');
var taskService = require('../service/taskService');
var projectService = require('../service/projectService');
var reportService = require('../service/reportService');

/**
 * Private var
 */  
var prefixUrl = '/rest/v1/';

var services = {
  user: userService,
  task: taskService,
  project: projectService,
  report: reportService
};

/**
 * Private function
 */
var findService = function(req) {
  for(var key in services) {
    if(req.url.indexOf(prefixUrl + key) === 0) {
      return {key: key, service: services[key]};
    }
  }
};

var parsePopulate = function(paramWith) {
  var populate = [];
  //with=user[login, password];user.tasks[duration]
  var objects = paramWith.split(';');//[user..., user.tasks...]
  for(var index in objects) {
    if(objects[index].indexOf('[') > 0 && objects[index].indexOf(']') > 0) {
      var path = objects[index].split('[')[0];//user
      var oParams = objects[index].split('[')[1].split(']')[0].split(',');//[login, password]
      var select = [];
      for(var indexParam in oParams) {
        select.push(oParams[indexParam]);
      }
      populate.push({path: path, select: select.join(' ')});
    }
  }
  return populate;
};

/**
 * Public function
 */
module.exports = function() {
    
  return function(req, res, next) {

    var returnRes = function(data) {
      if(!data) {
        res.send(501, {status: 501, error: 'oups'});
      } else if(data.error) {
        res.send(data.status, data);
      } else {
        res.json(data);
      }
      res.end();
    };

    var serviceObj = findService(req);
    if (serviceObj) {

      var serviceMethod = req.url.split(prefixUrl + serviceObj.key + '/')[1];
      serviceMethod = serviceMethod.split('?')[0];

      var service = serviceObj.service;
      if(serviceMethod && service[serviceMethod]) {

        var query, nbParams;
        if(req.method === 'GET') {
          query = url.parse(req.url, true).query;
          nbParams = Object.keys(query).length;
        } else {
          //TODO emplement post, put, delete
        }

        if(query && query.with) {
          query.populate = parsePopulate(query.with);
          console.log('==>', query.populate);
          delete query.with;
        }

        if(nbParams > 0 && service[serviceMethod].length === 3) {
          service[serviceMethod](
            query,
            function(data) { returnRes(data); },
            function(error) { returnRes({status: 404, error: error}); }
          );
        } else if(nbParams === 0 && service[serviceMethod].length === 2) {
          service[serviceMethod](
            function(data) { returnRes(data); },
            function(error) { returnRes({status: 404, error: error}); }
          );
        } else {
          returnRes({status: 404, error:'Not good arguments'});
        }

      //special url end with id and method get
      } else if(serviceMethod && MongoUtil.isObjectId(serviceMethod)) {

        if(req.method === 'GET'  && service.find) {
          service.find(
            {_id: serviceMethod},
            function(data) { returnRes(data); },
            function(error) { returnRes({status: 404, error: error}); }
          );
        } else if(req.method === 'PUT'  && service.update) {
          req.body._id = serviceMethod;
          service.update(
            req.body,
            function(data) { returnRes(data); },
            function(error) { returnRes({status: 404, error: error}); }
          );
          console.log(req.body);
        } else if(req.method === 'DELETE'  && service.delete) {
          service.delete(
            {_id: serviceMethod},
            function(data) { returnRes(data); },
            function(error) { returnRes({status: 404, error: error}); }
          );
        }

      } else {

        returnRes({status: 404, error:'Method not found'});

      }
    }
    else { 
      next();
    }
  };
    
};