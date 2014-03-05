angular.module('publicApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'src/login/login.tpl.html',
      controller: 'LoginController'
    })
    .when('/logged', {
      templateUrl: 'src/logged/logged.tpl.html',
      controller: 'LoggedController'
    })
    .when('/logged/:view', {
      templateUrl: 'src/logged/logged.tpl.html',
      controller: 'LoggedController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

angular.module('publicApp').controller('LoginController', 
  function ($scope, $http, $location) {
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
);

angular.module('publicApp').controller('LoggedController', 

  function($scope, $http, $routeParams) {

    var buildViewPath = function(view) {
      return 'src/logged/' + view + '/' + view + '.tpl.html';
    };

    if($routeParams.view) {
      $scope.currentView = buildViewPath($routeParams.view);
    }
  }
);

angular.module('publicApp').factory('LoggedController5', function($scope, $http, $routeParams) {

    var buildViewPath = function(view) {
      return 'src/logged/' + view + '/' + view + '.tpl.html';
    };

    if($routeParams.view) {
      $scope.currentView = buildViewPath($routeParams.view);
    }
  }
);