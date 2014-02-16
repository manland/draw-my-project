angular.module('app').controller('HeaderViewCtrl', [
  '$scope', 'HeaderViewService',
  function($scope, headerViewService) {

    $scope.style = {height: ''};
    $scope.showChartsType = false;

    $scope.allChartsType = headerViewService.getAllChartsType();

    $scope.switchAllChartsType = function() {
      $scope.showChartsType = !$scope.showChartsType;
      $scope.style.height = $scope.showChartsType === true ? '155px' : '';
    };

    $scope.selectChartType = function(chartType) {
      headerViewService.selectChartType(chartType);
    };

    $scope.legendVisible = headerViewService.isVisible('legend');
    $scope.filterVisible = headerViewService.isVisible('filter');
    $scope.advicesVisible = headerViewService.isVisible('advices');

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

  }
]);