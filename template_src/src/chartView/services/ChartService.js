angular.module('app').service('ChartService', [
  'DataService', 'WheelDependenciesChartService', 'PackageTreeChartService', 'SizeChartService', 'SizePackageChartService',
  function(dataService, wheelDependenciesChartService, packageTreeChartService, sizeChartService, sizePackageChartService) {

    var allCharts = [
      {
        name: 'Wheel Dependencies',
        chart: wheelDependenciesChartService,
        data: function() {
          return dataService.getData();
        }
      }, {
        name: 'Package Tree',
        chart: packageTreeChartService,
        data: function() {
          return dataService.getHierarchicalData();
        }
      }, {
        name: 'Size',
        chart: sizeChartService,
        data: function() {
          return dataService.getData();
        }
      }, {
        name: 'Size Package',
        chart: sizePackageChartService,
        data: function() {
          return dataService.getHierarchicalData();
        }
      }
    ];

    var currentChart = allCharts[0];
    var onTypeChartChangeCallbacks = [];

    return {
      getAllChartsType: function() {
        return allCharts.map(function(chart) {
          return chart.name;
        });
      },
      selectChart: function(chartType) {
        currentChart = undefined;
        for(var i=0, len=allCharts.length; i<len && currentChart === undefined; i++) {
          if(allCharts[i].name === chartType) {
            currentChart = allCharts[i];
          }
        }
        onTypeChartChangeCallbacks.forEach(function(callback) {
          callback();
        });
      },
      onTypeChartChange: function(callback) {
        onTypeChartChangeCallbacks.push(callback);
      },
      buildChart: function(domElement) {
        currentChart.chart.buildChart(domElement, currentChart.data());
      },
      mouseOver: function(nodeName) {
        currentChart.chart.mouseOver(nodeName);
      },
      mouseOut: function(nodeName) {
        currentChart.chart.mouseOut(nodeName);
      }
    };

  }
]);