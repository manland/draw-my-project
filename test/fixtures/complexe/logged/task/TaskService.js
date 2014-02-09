angular.module('publicApp').factory('TaskService', [
  'ServerRelationService', 'DataCacheService', 'ProjectService',
  function(serverRelationService, dataCacheService, projectService) {

    var listeners = [];//{all(tasks), add(task), projects(projects)}
    var userId = '52a4acdc5a647f1535000001';

    var getAll = function getAll() {
      dataCacheService.get('task', {method: 'findAll', query:'user='+userId+'&with=project[name]'})
      .then(
        function(data) {
          listeners.map(function(listener) {
            if(listener.all) {
              listener.all(data);
            }
          });
        }, 
        function(error) {
          console.log(error);
        }
      );
    };

    projectService.addListener({
      all: function(data) {
        listeners.map(function(listener) {
          listener.projects(data);
        });
      }
    });

    return {
      addListener: function(listener) {
        listeners.push(listener);
      },
      getAll: function() {
        getAll();
      },
      getAllProjects: function() {
        projectService.getAll();
      },
      add: function(duration, projectId, optDate) {
        var params = {method: 'add', query: 'user='+userId+'&duration='+duration+'&project='+projectId};
        if(optDate) {
          params.query = params.query + '&date='+optDate;
        }
        serverRelationService.get('task', params)
        .success(function(data) {
          listeners.map(function(listener) {
            if(listener.add) {
              listener.add(data);
            }
          });
        })
        .error(function(error) {
          console.error(error);
        });
      },
      modify: function(id, newDuration, newProjectId, newOptDate) {
        var params = {method: id, body: {duration: newDuration, project:newProjectId}};
        if(newOptDate) {
          params.body.date = newOptDate;
        }
        serverRelationService.put('task', params)
        .success(function(data) {
          dataCacheService.invalid('task');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      },
      delete: function(id) {
        var params = {method: id};
        serverRelationService.delete('task', params)
        .success(function(data) {
          dataCacheService.invalid('task');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      },
      deleteAll: function() {
        var params = {method: 'deleteAll'};
        serverRelationService.get('task', params)
        .success(function(data) {
          dataCacheService.invalid('task');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      },
      tasksForDates: function(startDate, endDate, callback) {
        var params = {
          method: 'tasksForDates', 
          query: 'user='+userId+'&startDate='+startDate.getTime()+'&endDate='+endDate.getTime()+'&with=project[name]'
        };
        serverRelationService.get('task', params)
        .success(function(data) {
          dataCacheService.invalid('task');
          callback(data);
        }).error(function(error) {
          console.error(error);
        });
      }
    };

  }
]);