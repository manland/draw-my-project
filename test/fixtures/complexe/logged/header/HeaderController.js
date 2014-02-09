angular.module('publicApp').controller('HeaderController', [
  '$scope', '$location', '$routeParams',
  function($scope, $location, $routeParams) {

    $scope.disableProject = ($routeParams.view === 'project');
    $scope.disableTask = ($routeParams.view === 'task');
    $scope.disableUser = ($routeParams.view === 'user');
    $scope.disableReport = ($routeParams.view === 'report');

    $scope.onLogout = function() {
      $location.url('login');
    };
    $scope.onUser = function() {
      $location.url('logged/user');
    };
    $scope.onTask = function() {
      $location.url('logged/task');
    };
    $scope.onProject = function() {
      $location.url('logged/project');
    };
    $scope.onReport = function() {
      $location.url('logged/report');
    };
  }
]);