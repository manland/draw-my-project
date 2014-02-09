angular.module('publicApp').factory('ServerRelationService', [
  '$http', '$q',
  function($http, $q) {

    var buildUrl = function buildUrl(key, params) {
      if(!params.method) {
        throw new Exception('ServerRelation::get params must have method');
      }

      var url = '/rest/v1/'+key+'/'+params.method;

      if(params.query) {
        url = url + '?' + params.query;
      }

      return url;
    };

    var get = function get(key, params) {
      return $http.get(buildUrl(key, params));
    };

    var put = function put(key, params) {
      if(!params.body) {
        throw new Exception('ServerRelation::put params must have body');
      }
      return $http.put(buildUrl(key, params), params.body);
    };

    var myDelete = function myDelete(key, params) {
      return $http.delete(buildUrl(key, params));
    };

    return {
      get: function(key, params) {
        return get(key, params);
      },
      put: function(key, params) {
        return put(key, params);
      },
      delete: function(key, params) {
        return myDelete(key, params);
      }
    };

  }
]);