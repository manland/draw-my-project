angular.module('publicApp').factory('DataCacheService', [
  '$q', '$timeout', 'ServerRelationService',
  function($q, $timeout, serverRelationService) {

    var data = {};

    var get = function get(key, params) {
      var deferred = $q.defer();
      if(data[key]) {
        $timeout(function() {
          deferred.resolve(data[key]);
        });
      } else {
        promise = serverRelationService.get(key, params);
        promise.success(function(res) {
          data[key] = res;
          deferred.resolve(data[key]);
        });
      }
      return deferred.promise;
    };

    return {
      get: function(key, params) {
        return get(key, params);
      },
      invalid: function(key) {
        data[key] = undefined;
        delete data[key];
      }
    };

  }
]);