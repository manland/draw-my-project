angular.module('app').service('HeaderViewService', [
  'ChartViewService', 'ChartService',
  function(chartViewService, chartService) {

    return {
      getAllChartsType: function() {
        return chartService.getAllChartsType();
      },
      selectChartType: function(chartType) {
        chartService.selectChart(chartType);
      },
      isVisible: function(name) {
        return chartViewService.isVisible(name);
      },
      switchLegend: function() {
        chartViewService.switchLegend();
      },
      switchFilter: function() {
        chartViewService.switchFilter();
      },
      switchAdvices: function() {
        chartViewService.switchAdvices();
      }
    };

  }
]);