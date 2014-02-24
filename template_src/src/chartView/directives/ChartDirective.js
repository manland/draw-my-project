angular.module('app').directive('dmpChart', [
  'ChartService', 'ScreenSizeService',
  function(chartService, screenSizeService) {

    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        chartService.buildChart(element[0]);
        chartService.onTypeChartChange(function() {
          element[0].innerHTML = '';
          chartService.buildChart(element[0]);
        });
        screenSizeService.onResize(function() {
          element[0].innerHTML = '';
          chartService.buildChart(element[0]);
        });
      }
    };
  
  }

]);