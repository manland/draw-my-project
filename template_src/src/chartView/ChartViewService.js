angular.module('app').service('ChartViewService', [
  function() {

    var visible = {
      legend: false,
      filter: false,
      advices: false
    };

    var callbacks = {
      switchLegend: [],
      switchFilter: [],
      switchAdvices: []
    };

    var fire = function fire(keyCallbacks) {
      callbacks[keyCallbacks].forEach(function(callback) {
        callback();
      });
    };

    return {
      on: function(key, callback) {
        if(callbacks[key] !== undefined) {
          callbacks[key].push(callback);
        } else {
          throw 'ChartViewService not implement '+key+' listener !';
        }
      },
      isVisible: function(name) {
        return visible[name];
      },
      switchLegend: function() {
        visible.legend = !visible.legend;
        fire('switchLegend');
      },
      switchFilter: function() {
        visible.filter = !visible.filter;
        fire('switchFilter');
      },
      switchAdvices: function() {
        visible.advices = !visible.advices;
        fire('switchAdvices');
      }
    };
  }
]);