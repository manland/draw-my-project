angular.module('app').controller('HeaderViewCtrl', [
  '$scope', 'HeaderViewService',
  function($scope, headerViewService) {

    $scope.style = {height: ''};
    $scope.showChartsType = false;

    $scope.allChartsType = headerViewService.getAllChartsType();

    var openHeight = $scope.allChartsType.length * 50;

    $scope.switchAllChartsType = function() {
      $scope.showChartsType = !$scope.showChartsType;
      $scope.style.height = $scope.showChartsType === true ? openHeight+'px' : '';
    };

    $scope.selectChartType = function(chartType) {
      headerViewService.selectChartType(chartType);
    };

    $scope.legendVisible = headerViewService.isVisible('legend');
    $scope.filterVisible = headerViewService.isVisible('filter');
    $scope.advicesVisible = headerViewService.isVisible('advices');

    $scope.advicesAvailable = headerViewService.advicesAvailable();

    $scope.switchLegend = function() {
      headerViewService.switchLegend();
      $scope.legendVisible = headerViewService.isVisible('legend');
    };

    $scope.switchFilter = function() {
      headerViewService.switchFilter();
      $scope.filterVisible = headerViewService.isVisible('filter');
    };

    $scope.switchAdvices = function() {
      headerViewService.switchAdvices();
      $scope.advicesVisible = headerViewService.isVisible('advices');
    };

    $scope.switchBodyBackground = function() {
      headerViewService.switchBodyBackground();
    };

  }
]);