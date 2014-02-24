angular.module('app').service('FilterViewService', [
  'DataService', 'ChartService',
  function(dataService, chartService) {
    return {
      getNodes: function() {
        var data = dataService.getData();
        var nodes = [];
        data.forEach(function(d) {
          nodes.push(d.name);
        });
        return nodes.sort();
      },
      mouseOver: function(nodeName) {
        chartService.mouseOver(nodeName);
      },
      mouseOut: function(nodeName) {
        chartService.mouseOut(nodeName);
      },
      mouseClick: function(nodeName) {
        chartService.mouseClick(nodeName);
      }
    };
  }
]);