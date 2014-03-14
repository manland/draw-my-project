angular.module('app').service('HeaderViewService', [
  'ChartViewService', 'ChartService', 'OnOffSwitchService',
  function(chartViewService, chartService, onOffSwitchService) {

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
      advicesAvailable: function() {
        return chartViewService.advicesAvailable();
      },
      switchLegend: function() {
        chartViewService.switchLegend();
      },
      switchFilter: function() {
        chartViewService.switchFilter();
      },
      switchAdvices: function() {
        chartViewService.switchAdvices();
      },
      switchBodyBackground: function() {
        onOffSwitchService.switchTo();
      }
    };

  }
]);