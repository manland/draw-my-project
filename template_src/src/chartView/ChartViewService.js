angular.module('app').service('ChartViewService', [
  'LocalStorageService',
  function(localStorageService) {

    var callbacks = {
      switchLegend: [],
      switchFilter: [],
      switchAdvices: []
    };

    var visible = localStorageService.get('visible');

    var fire = function fire(keyCallbacks, value) {
      localStorageService.update('visible', visible);
      callbacks[keyCallbacks].forEach(function(callback) {
        callback(value);
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
        fire('switchLegend', visible.legend);
      },
      switchFilter: function() {
        visible.filter = !visible.filter;
        fire('switchFilter', visible.filter);
      },
      switchAdvices: function() {
        visible.advices = !visible.advices;
        fire('switchAdvices', visible.advices);
      }
    };
  }
]);