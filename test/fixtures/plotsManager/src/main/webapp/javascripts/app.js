var app = angular.module('app', []);

app.config(["$routeProvider", "$httpProvider",
  function($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers['common']['Accept'] = 'application/json';
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: "loginController"
      })
      .when('/ppe', {
        templateUrl: 'views/ppe.html',
        controller: "ppeController"
      })	  
      .when('/view', {
        templateUrl: 'views/view.html',
        controller: "viewController"
      })	  

      .otherwise({
        redirectTo: '/'
      });
  }
]);
