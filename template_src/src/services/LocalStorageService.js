angular.module('app').service('LocalStorageService', [
  function() {

    var defaultValue = {
      visible: {
        legend: false,
        filter: false,
        advices: false
      },
      chart: {
        name: 'Wheel Dependencies'
      },
      background: {
        isOn: true
      }
    };

    return {
      get: function(key) {
        if(localStorage[key] !== undefined) {
          return JSON.parse(localStorage[key]);
        } else {
          return defaultValue[key];
        }
      },
      update: function(key, value) {
        localStorage[key] = JSON.stringify(value);
      }
    };

  }
]);