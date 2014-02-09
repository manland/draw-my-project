angular.module('publicApp').factory('ProjectService', [
  'ServerRelationService', 'DataCacheService',
  function(serverRelationService, dataCacheService) {

    var listeners = [];//{all(projects), add(project)}

    var getAll = function getAll() {
      dataCacheService.get('project', {method: 'getAll'})
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

    return {
      addListener: function(listener) {
        listeners.push(listener);
      },
      getAll: function() {
        getAll();
      },
      add: function(projectName) {
        var params = {method: 'add', query: 'name='+projectName};
        serverRelationService.get('project', params)
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
      modify: function(id, newName) {
        var params = {method: id, body: {name: newName}};
        serverRelationService.put('project', params)
        .success(function(data) {
          dataCacheService.invalid('project');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      },
      delete: function(id) {
        var params = {method: id};
        serverRelationService.delete('project', params)
        .success(function(data) {
          dataCacheService.invalid('project');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      },
      deleteAll: function() {
        var params = {method: 'deleteAll'};
        serverRelationService.get('project', params)
        .success(function(data) {
          dataCacheService.invalid('project');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      }
    };

  }
]);