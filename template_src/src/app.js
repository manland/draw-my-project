angular.module('app', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'src/chartView/ChartView.tpl.html',
      controller: 'ChartViewCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);