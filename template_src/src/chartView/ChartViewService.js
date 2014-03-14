angular.module('app').service('ChartViewService', [
  'LocalStorageService', 'AdviceViewService',
  function(localStorageService, adviceViewService) {

    var callbacks = {
      switchLegend: [],
      switchFilter: [],
      switchAdvices: []
    };

    var visible = localStorageService.get('visible');

    var checkAdvicesNotEmpty = function checkAdvicesNotEmpty() {
      if(adviceViewService.getAdvices().length === 0) {
        visible.advices = false;
      }
    };
    checkAdvicesNotEmpty();

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
      advicesAvailable: function() {
        return adviceViewService.getAdvices().length > 0;
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
        checkAdvicesNotEmpty();
        fire('switchAdvices', visible.advices);
      }
    };
  }
]);