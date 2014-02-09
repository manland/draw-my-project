angular.module('publicApp').controller('LoginController', [
  '$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.showError = false;
    $scope.onLogin = function() {
      console.log('login');
      var url = '/rest/v1/user/login?login=' + $scope.login + '&password=' + $scope.password;
      $http.get(url).success(function(data) {
        $location.url('logged');
      }).error(function(error) {
        console.log(error);
        $scope.showError = true;
        $scope.error = error;
      });
    };
  }
]);