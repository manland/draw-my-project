angular.module('app').controller('ChartViewCtrl', [
  '$scope', 'ChartViewService',
  function($scope, chartViewService) {

    $scope.legendVisible = chartViewService.isVisible('legend');
    $scope.filterVisible = chartViewService.isVisible('filter');
    $scope.advicesVisible = chartViewService.isVisible('advices');

    chartViewService.on('switchLegend', function() {
      $scope.legendVisible = chartViewService.isVisible('legend');
    });

    chartViewService.on('switchFilter', function() {
      $scope.filterVisible = chartViewService.isVisible('filter');
    });

    chartViewService.on('switchAdvices', function() {
      $scope.advicesVisible = chartViewService.isVisible('advices');
    });

  }
]);