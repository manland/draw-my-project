angular.module('publicApp').factory('UserService', [
  'ServerRelationService', 'DataCacheService',
  function(serverRelationService, dataCacheService) {

    var listeners = [];

    var getAll = function getAll() {
      dataCacheService.get('user', {method: 'getAll'})
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
      add: function(login, password) {
        var params = {method: 'add', query: 'login='+login+'&password='+password};
        serverRelationService.get('user', params)
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
      modify: function(id, newLogin, newPassword) {
        var params = {method: id, body: {login: newLogin, password:newPassword}};
        serverRelationService.put('user', params)
        .success(function(data) {
          dataCacheService.invalid('user');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      },
      delete: function(id) {
        var params = {method: id};
        serverRelationService.delete('user', params)
        .success(function(data) {
          dataCacheService.invalid('user');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      },
      deleteAll: function() {
        var params = {method: 'deleteAll'};
        serverRelationService.get('user', params)
        .success(function(data) {
          dataCacheService.invalid('user');
          getAll();
        }).error(function(error) {
          console.error(error);
        });
      }
    };

  }
]);