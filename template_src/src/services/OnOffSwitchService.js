angular.module('app').service('OnOffSwitchService', [
  'LocalStorageService',
  function(localStorageService) {

    var callbacks = [];
    var isOn = localStorageService.get('background').isOn;

    return {
      onSwitch: function(callback) {
        callbacks.push(callback);
        callback(isOn);
      },
      switchTo: function() {
        isOn = !isOn;
        localStorageService.update('background', {isOn: isOn});
        _.each(callbacks, function(callback) {
          callback(isOn);
        });
      }
    };

  }
]);