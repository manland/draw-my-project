angular.module('publicApp').controller('LoggedController', [
  '$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {

    var buildViewPath = function(view) {
      return 'src/logged/' + view + '/' + view + '.tpl.html';
    };

    if($routeParams.view) {
      $scope.currentView = buildViewPath($routeParams.view);
    }
  }
]);