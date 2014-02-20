angular.module('app').controller('HeaderViewCtrl', [
  '$scope', 'HeaderViewService',
  function($scope, headerViewService) {

    $scope.style = {height: ''};
    $scope.showChartsType = false;

    $scope.allChartsType = headerViewService.getAllChartsType();

    var openHeight = (50 + ($scope.allChartsType.length * 50));

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

    var countClick = 0;

    $scope.switchBodyBackground = function() {
      countClick = countClick + 1;
      if(countClick % 2 === 0) {
        headerViewService.switchBodyBackground();
      }
    };

  }
]);